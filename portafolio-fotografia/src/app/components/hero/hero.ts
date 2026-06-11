import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // 1. Importa Router
import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit {
  adminService = inject(AdminService);
  http = inject(HttpClient);
  router = inject(Router); // 2. Inyecta el Router

  heroImageUrl = signal('URL_POR_DEFECTO');
  isEditing = signal(false);
  archivoSeleccionado: File | undefined;

  irAlPortafolio() {
    this.router.navigate(['/portafolio']); // Ajusta la ruta según cómo se llame tu sección de portafolio
  }

  ngOnInit() {
    this.cargarConfiguracion();
  }

  cargarConfiguracion() {
    this.http.get<any>('http://localhost:3000/hero').subscribe(data => {
      if (data?.imageUrl) this.heroImageUrl.set(data.imageUrl);
    });
  }

  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  guardarNuevaImagen() {
    if (!this.archivoSeleccionado) return;

    const formData = new FormData();
    formData.append('file', this.archivoSeleccionado);

    this.http.post('http://localhost:3000/hero', formData).subscribe((data: any) => {
      // Asumiendo que el backend te devuelve { imageUrl: '...' }
      this.heroImageUrl.set(data.imageUrl);
      this.isEditing.set(false);
      this.archivoSeleccionado = undefined; // Limpiamos para la próxima
    });
  }

  activarEdicion() {
    this.isEditing.set(true);
  }
}