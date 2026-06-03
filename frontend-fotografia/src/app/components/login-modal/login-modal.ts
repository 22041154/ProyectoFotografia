import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginModalService } from '../../services/login-modal/login-modal.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-modal.html',
  styleUrls: ['./login-modal.scss']
})
export class LoginModalComponent implements OnInit {
  visible = false;
  correo = '';
  contrasena = '';
  error = '';

  constructor(private loginModalService: LoginModalService) {}

  ngOnInit() {
    this.loginModalService.estado$.subscribe(estado => {
      this.visible = estado;
      if (!estado) this.limpiar();
    });
  }

  entrar() {
    if (!this.correo || !this.contrasena) {
      this.error = 'Por favor completa todos los campos.';
      return;
    }
    // Por ahora solo cierra — aquí conectaremos el backend después
    this.error = '';
    console.log('Login con:', this.correo);
    this.cerrar();
  }

  cerrar() {
    this.loginModalService.cerrar();
  }

  limpiar() {
    this.correo = '';
    this.contrasena = '';
    this.error = '';
  }
}