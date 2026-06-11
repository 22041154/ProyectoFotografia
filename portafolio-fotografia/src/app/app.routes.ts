import { Routes } from '@angular/router';
import { Hero } from './components/hero/hero'; // O el componente que sea tu inicio
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: '', component: Hero }, // Tu página principal
  { path: 'login', component: Login } // La nueva ruta para iniciar sesión
];