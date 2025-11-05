import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const STUDENTS_API = 'https://localhost:7003/api/Students';
const SUBJECTS_API = 'https://localhost:7003/api/Subjects';
const USERS_API    = 'https://localhost:7003/api/Users';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AdminDashboard implements OnInit {
  admin: any = null;
  students: any[] = [];
  subjects: any[] = [];
  users: any[] = [];

  selectedSubjects: number[] = [];
  form = { name: '', address: '', email: '', mobileNo: '' };
  editId: number | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.admin = JSON.parse(localStorage.getItem('admin') || 'null');
    if (!this.admin) {
      alert('Please login as Admin first!');
      this.router.navigate(['/AdminLogin']);
      return;
    }
    this.fetchStudents();
    this.fetchSubjects();
    this.fetchUsers();
  }

  async fetchStudents() {
    try {
      const res = await fetch(STUDENTS_API);
      if (!res.ok) throw new Error('Failed to fetch students');
      this.students = await res.json();
    } catch {
      alert('Failed to fetch students');
    }
  }

  async fetchSubjects() {
    try {
      const res = await fetch(SUBJECTS_API);
      if (!res.ok) throw new Error('Failed to fetch subjects');
      this.subjects = await res.json();
    } catch {
      alert('Failed to fetch subjects');
    }
  }

  async fetchUsers() {
    try {
      const res = await fetch(USERS_API);
      if (!res.ok) throw new Error('Failed to fetch users');
      this.users = await res.json();
    } catch {
      alert('Failed to fetch users');
    }
  }

  handleSubjectChange(id: number) {
    if (this.selectedSubjects.includes(id)) {
      this.selectedSubjects = this.selectedSubjects.filter(s => s !== id);
    } else {
      this.selectedSubjects = [...this.selectedSubjects, id];
    }
  }

  validateForm(): boolean {
    if (
      !this.form.name.trim() ||
      !this.form.address.trim() ||
      !this.form.email.trim() ||
      !this.form.mobileNo.trim()
    ) {
      alert('Please fill all fields!');
      return false;
    }
    if (this.selectedSubjects.length === 0) {
      alert('Please select at least one subject!');
      return false;
    }
    return true;
  }

  async addStudent() {
    if (!this.validateForm()) return;
    try {
      const res = await fetch(STUDENTS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...this.form,
          subjects: this.selectedSubjects,
        }),
      });
      if (!res.ok) throw new Error("Error adding student");
      alert("Student added successfully!");
      this.form = { name: "", address: "", email: "", mobileNo: "" };
      this.selectedSubjects = [];
      this.fetchStudents();
    } catch {
      alert("Error adding student");
    }
  }

  async saveStudent() {
    if (!this.validateForm() || !this.editId) return;
    try {
      const res = await fetch(`${STUDENTS_API}/${this.editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...this.form,
          subjects: this.selectedSubjects,
        }),
      });
      if (!res.ok) throw new Error("Error updating student");
      alert("Student updated successfully!");
      this.form = { name: "", address: "", email: "", mobileNo: "" };
      this.selectedSubjects = [];
      this.editId = null;
      this.fetchStudents();
    } catch {
      alert("Error updating student");
    }
  }

  async deleteStudent(id: number) {
    try {
      const res = await fetch(`${STUDENTS_API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error deleting student");
      alert("Student deleted!");
      this.fetchStudents();
    } catch {
      alert("Error deleting student");
    }
  }

  startEdit(student: any) {
    this.form = {
      name: student.name,
      address: student.address,
      email: student.email,
      mobileNo: student.mobileNo,
    };
    this.selectedSubjects = student.subjects || [];
    this.editId = student.id;
    alert("Editing student...");
  }

  handleLogout() {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    alert("Logged out successfully!");
    this.router.navigate(['/']);
  }
}
