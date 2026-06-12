import { Routes } from '@angular/router';
import { Hero } from './components/hero/hero'; 
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: '', component: Hero }, 
  { path: 'login', component: Login } 
];