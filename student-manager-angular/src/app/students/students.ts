import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  templateUrl: './students.html',
  styleUrls: ['./students.css'],
  standalone: true,
  imports: [CommonModule],
})
export class Students {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }

  btnStyle(color: string) {
    return {
      padding: '14px 28px',
      background: color,
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease',
    };
  }
}
