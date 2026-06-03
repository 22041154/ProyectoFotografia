import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria.html', // Pon el nombre exacto de tu archivo HTML
  styleUrls: []   // Pon el nombre exacto de tu archivo CSS
})
export class GaleriaComponent implements OnInit {
  fotos: any[] = [];

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
  this.photoService.getPhotos().subscribe({
    next: (data: any[]) => {
      this.fotos = data;
    },
    error: (err: any) => console.error('Error al cargar las fotos', err)
  });
} 
}