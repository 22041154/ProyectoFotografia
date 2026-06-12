import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
  router = inject(Router); 

  heroImageUrl = signal('URL_POR_DEFECTO');
  isEditing = signal(false);
  archivoSeleccionado: File | undefined;

  irAlPortafolio() {
    this.router.navigate(['/portafolio']); 
  }

  ngOnInit() {
    this.cargarConfiguracion();
  }

  cargarConfiguracion() {
    this.http.get<any>('https://api-portafolio-04g4.onrender.com/hero').subscribe(data => {
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

    this.http.post('https://api-portafolio-04g4.onrender.com/hero', formData).subscribe((data: any) => {
      this.heroImageUrl.set(data.imageUrl);
      this.isEditing.set(false);
      this.archivoSeleccionado = undefined; 
    });
  }

  activarEdicion() {
    this.isEditing.set(true);
  }

  navegarA(seccion: string) {
  const elemento = document.getElementById(seccion);
  if (elemento) {
    elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
}
