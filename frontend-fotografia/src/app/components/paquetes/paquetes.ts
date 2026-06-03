import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Paquete {
  nombre: string;
  precio: string;
  descripcion: string;
  beneficios: string[];
  destacado: boolean;
}

@Component({
  selector: 'app-paquetes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paquetes.html',
  styleUrls: ['./paquetes.scss']
})
export class PaquetesComponent {
  paquetes: Paquete[] = [
    {
      nombre: 'Básico',
      precio: '1,500',
      descripcion: 'Ideal para sesiones personales o familiares sencillas.',
      beneficios: [
        '1 hora de sesión',
        '20 fotos editadas',
        'Entrega en 5 días',
        'Galería digital privada',
      ],
      destacado: false,
    },
    {
      nombre: 'Estándar',
      precio: '3,500',
      descripcion: 'Perfecto para eventos medianos y sesiones profesionales.',
      beneficios: [
        '3 horas de sesión',
        '60 fotos editadas',
        'Entrega en 7 días',
        'Galería digital privada',
        'Impresión 20x25 cm',
      ],
      destacado: true,
    },
    {
      nombre: 'Premium',
      precio: '7,000',
      descripcion: 'Cobertura completa para bodas y eventos especiales.',
      beneficios: [
        'Cobertura completa del evento',
        '150+ fotos editadas',
        'Entrega en 10 días',
        'Galería digital privada',
        'Álbum impreso 30x30 cm',
        'Video highlights',
      ],
      destacado: false,
    },
  ];
}