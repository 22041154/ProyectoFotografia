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

  semblanzaText = signal('Cargando semblanza desde la base de datos...');
  isEditing = signal(false);

  ngOnInit() {
    this.cargarSemblanza();
  }

  cargarSemblanza() {
    this.http.get<any>('http://localhost:3000/about').subscribe(data => {
      if (data && data.texto) {
        this.semblanzaText.set(data.texto);
      }
    });
  }

  guardarCambios(nuevoTexto: string) {
    if (!nuevoTexto.trim()) {
      alert('La semblanza no puede estar vacía');
      return;
    }

    this.http.post('http://localhost:3000/about', { texto: nuevoTexto }).subscribe(() => {
      this.semblanzaText.set(nuevoTexto);
      this.isEditing.set(false); 
      alert('¡Semblanza actualizada en la nube con éxito!');
    });
  }


  activarEdicion() {
    this.isEditing.set(true);
  }

  cancelarEdicion() {
    this.isEditing.set(false);
  }
}