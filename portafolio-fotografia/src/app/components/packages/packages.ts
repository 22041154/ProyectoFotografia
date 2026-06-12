import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-packages',
  standalone: true,
  templateUrl: './packages.html',
  styleUrl: './packages.css'
})
export class Packages implements OnInit {
  adminService = inject(AdminService);
  http = inject(HttpClient);

  paquetes = signal<any[]>([]);

  ngOnInit() {
    this.cargarPaquetes();
  }

  cargarPaquetes() {
    this.http.get<any[]>('https://api-portafolio-04g4.onrender.com/packages').subscribe(data => {
      this.paquetes.set(data);
    });
  }

  agregarPaquete(etiqueta: string, titulo: string, precio: string, caracteristicasTexto: string) {
    if (!etiqueta || !titulo || !precio || !caracteristicasTexto) {
      alert('Por favor, llena todos los campos del paquete.');
      return;
    }

    const listaCaracteristicas = caracteristicasTexto.split(',').map(item => item.trim());

    const nuevoPaquete = {
      etiqueta, 
      titulo,
      precio: Number(precio),
      caracteristicas: listaCaracteristicas
    };

    this.http.post('https://api-portafolio-04g4.onrender.com/packages', nuevoPaquete).subscribe(() => {
      this.cargarPaquetes();
      alert('¡Paquete guardado con éxito!');
    });
  }

  eliminarPaquete(id: string) {
    if(confirm('¿Estás seguro de eliminar este paquete?')) {
      this.http.delete(`https://api-portafolio-04g4.onrender.com/packages/${id}`).subscribe(() => {
        this.cargarPaquetes(); 
      });
    }
  }
  irAContacto() {
    const contactoSection = document.getElementById('contacto');
    if (contactoSection) {
      contactoSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
