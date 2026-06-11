import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit {
  adminService = inject(AdminService);
  http = inject(HttpClient);

  semblanzaText = signal('Cargando semblanza...');
  // Añadimos una señal para guardar la URL de la imagen que viene de la BD
  imagenUrl = signal('assets/profile.jpg'); 
  isEditing = signal(false);
  archivoSeleccionado: File | undefined;

  ngOnInit() {
    this.cargarSemblanza();
  }

  cargarSemblanza() {
    this.http.get<any>('http://localhost:3000/about').subscribe(data => {
      if (data) {
        if (data.texto) this.semblanzaText.set(data.texto);
        if (data.imagenUrl) this.imagenUrl.set(data.imagenUrl);
      }
    });
  }

  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  guardarCambios(nuevoTexto: string) {
    if (!nuevoTexto.trim()) {
      alert('La semblanza no puede estar vacía');
      return;
    }

    const formData = new FormData();
    formData.append('texto', nuevoTexto);
    if (this.archivoSeleccionado) {
      formData.append('file', this.archivoSeleccionado);
    }

    this.http.post('http://localhost:3000/about', formData).subscribe((data: any) => {
      this.semblanzaText.set(nuevoTexto);
      if (data.imagenUrl) this.imagenUrl.set(data.imagenUrl);
      this.isEditing.set(false);
      this.archivoSeleccionado = undefined;
      alert('¡Actualizado con éxito!');
    });
  }

  activarEdicion() { this.isEditing.set(true); }
  cancelarEdicion() { this.isEditing.set(false); }
}