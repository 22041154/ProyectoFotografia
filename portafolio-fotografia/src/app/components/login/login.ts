import { Component, inject, signal } from '@angular/core';
import { AdminService } from '../../services/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css' // Si tienes un archivo CSS para este componente
})
export class Login {
  private adminService = inject(AdminService);
  private router = inject(Router);
  
  // Señal para mostrar errores de contraseña incorrecta
  error = signal('');

  async iniciarSesion(email: string, pass: string) {
    try {
      this.error.set(''); // Limpiamos errores previos
      await this.adminService.login(email, pass);
      this.router.navigate(['/']); // ¡Éxito! Te mandamos a la página de inicio
    } catch (e) {
      this.error.set('Correo o contraseña incorrectos. Intenta de nuevo.');
    }
  }
}