import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Foto {
  titulo: string;
  categoria: string;
  url: string;
}

@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portafolio.html',
  styleUrls: ['./portafolio.scss']
})
export class PortafolioComponent {
  categorias = ['Todos', 'Paisajismo', 'Retrato', 'Photo Art', 'Bodas'];
  categoriaActiva = 'Todos';

  fotos: Foto[] = [
    { titulo: 'Amanecer en el campo', categoria: 'Paisajismo', url: '/assets/foto1.jpg' },
    { titulo: 'Retrato natural', categoria: 'Retrato', url: '/assets/foto2.jpg' },
    { titulo: 'Arte en blanco y negro', categoria: 'Photo Art', url: '/assets/foto3.jpg' },
    { titulo: 'Boda en jardín', categoria: 'Bodas', url: '/assets/foto4.jpg' },
    { titulo: 'Atardecer dorado', categoria: 'Paisajismo', url: '/assets/foto5.jpg' },
    { titulo: 'Mirada profunda', categoria: 'Retrato', url: '/assets/foto6.jpg' },
  ];

  get fotosFiltradas(): Foto[] {
    if (this.categoriaActiva === 'Todos') return this.fotos;
    return this.fotos.filter(f => f.categoria === this.categoriaActiva);
  }

  filtrar(categoria: string) {
    this.categoriaActiva = categoria;
  }
}