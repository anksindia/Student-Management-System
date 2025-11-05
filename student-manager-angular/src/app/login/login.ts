import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const API_URL = 'https://localhost:7003/api/Users/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class Login {
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
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        setTimeout(() => this.router.navigate(['/dashboard']), 1000);
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
    if (target) target.style.background = '#1a5edb';
  }

  onMouseOut(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
    if (target) target.style.background = '#2575fc';
  }
}
