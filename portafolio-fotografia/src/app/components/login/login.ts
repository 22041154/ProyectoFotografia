import { Component, inject, signal } from '@angular/core';
import { AdminService } from '../../services/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css' 
})
export class Login {
  private adminService = inject(AdminService);
  private router = inject(Router);
  
  error = signal('');

  async iniciarSesion(email: string, pass: string) {
    try {
      this.error.set(''); 
      await this.adminService.login(email, pass);
      this.router.navigate(['/']); 
    } catch (e) {
      this.error.set('Correo o contraseña incorrectos. Intenta de nuevo.');
    }
  }
}