import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria.html', // <-- Corregido
  styleUrls: ['./galeria.scss'] // Si usas .css, cámbialo a .css
})
export class GaleriaComponent implements OnInit {
  fotos: any[] = [];

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe({
      next: (data) => {
        this.fotos = data;
      },
      error: (err) => console.error('Error al cargar las fotos', err)
    });
  }
}