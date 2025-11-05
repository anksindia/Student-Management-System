import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const API_URL = 'https://localhost:7003/api/Users/admin-login';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AdminLogin {
  form = { email: '', password: '' };
  showPassword = false;

  constructor(private router: Router) {}

  handleChange(event: any) {
    const { name, value } = event.target;
    this.form = { ...this.form, [name]: value };
  }

  async handleLogin(event: Event) {
    event.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('admin', JSON.stringify(data.user));
        localStorage.setItem('adminToken', data.token);
        alert('Admin login successful!');
        setTimeout(() => this.router.navigate(['/AdminDashboard']), 1000);
      } else {
        const err = await res.text();
        alert(err);
      }
    } catch {
      alert('Something went wrong!');
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
    if (target) {
      target.style.background = '#1a5edb';
    }
  }

  onMouseOut(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
    if (target) {
      target.style.background = '#2575fc';
    }
  }
}
