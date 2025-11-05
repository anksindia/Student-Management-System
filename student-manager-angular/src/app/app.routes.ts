import { Routes } from '@angular/router';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { Students } from './students/students';
import { Login } from './login/login';
import { Register } from './register/register';
import { Dashboard } from './dashboard/dashboard';
import { AdminLogin } from './admin-login/admin-login';

export const routes: Routes = [
  { path: '', component: Students },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },
  { path: 'AdminLogin', component: AdminLogin },
  { path: 'AdminDashboard', component: AdminDashboard },
];
