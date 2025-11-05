import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const API_URL = 'https://localhost:7003/api/Users/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class Register {
  form = { name: '', rollNumber: '', email: '', password: '' };
  showPassword = false;

  constructor(private router: Router) {}

  handleChange(event: any) {
    const { name, value } = event.target;
    this.form = { ...this.form, [name]: value };
  }

  async handleRegister(event: Event) {
    event.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form),
      });

      if (res.ok) {
        alert('Registration successful, please log in!');
        setTimeout(() => this.router.navigate(['/login']), 1000);
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
    if (target) target.style.background = '#1e7e34';
  }

  onMouseOut(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
    if (target) target.style.background = '#28a745';
  }
}
