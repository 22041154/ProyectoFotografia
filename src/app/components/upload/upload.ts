import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../../services/photo.service';


@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.html', 
  styleUrls: ['./upload.scss'] // Si en tu proyecto usas .css, cámbialo a './upload.css'
})
export class UploadComponent {
  // Variables que conectan con el HTML
  archivoSeleccionado: File | null = null;
  cargando: boolean = false;
  mensajeExito: boolean = false;

  constructor(private photoService: PhotoService) {}

  // Se ejecuta cuando el usuario elige una foto de sus carpetas
  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  // Se ejecuta al hacer clic en el botón de publicar
  subirFoto(titulo: string, categoria: string) {
    // 1. Validar que no falten datos
    if (!this.archivoSeleccionado || !titulo || !categoria) {
      alert('Por favor, completa todos los campos y selecciona una imagen.');
      return;
    }

    // 2. Mostrar la ruedita de carga en el botón
    this.cargando = true;

    // 3. Enviar al backend (NestJS)
    this.photoService.uploadPhoto(titulo, categoria, this.archivoSeleccionado).subscribe({
      next: (respuesta: any) => { 
        // 4. Si todo sale bien, quitamos la carga y mostramos éxito
        this.cargando = false;
        this.mensajeExito = true;
        
        // Esperamos 2 segundos y recargamos la página para ver la foto
        setTimeout(() => {
          this.mensajeExito = false;
          window.location.reload(); 
        }, 2000);
      },
      error: (err: any) => { 
        // 5. Si algo falla, quitamos la carga y mostramos el error
        console.error('Error al subir:', err);
        this.cargando = false;
        alert('Hubo un error al subir la fotografía. Revisa la consola para más detalles.');
      }
    });
  }
}