import { Routes } from '@angular/router';
import { GaleriaComponent } from './components/galeria/galeria';

export const routes: Routes = [
  { path: '', component: GaleriaComponent },
  { path: '**', redirectTo: '' }
];