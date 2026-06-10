import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss']
})
export class InicioComponent {
  // Datos de prueba con imágenes de Unsplash en diferentes proporciones
  fotos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600', titulo: 'Sesión en Estudio' },
    { id: 2, url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600', titulo: 'Retrato Urbano' },
    { id: 3, url: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=600', titulo: 'Naturaleza y Luz' },
    { id: 4, url: 'https://images.unsplash.com/photo-1516222338250-863216ce01ea?q=80&w=600', titulo: 'Blanco y Negro' },
    { id: 5, url: 'https://images.unsplash.com/photo-1554046920-90dcac823a88?q=80&w=600', titulo: 'Evento Social' },
    { id: 6, url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=600', titulo: 'Fotografía Nocturna' }
  ];
}