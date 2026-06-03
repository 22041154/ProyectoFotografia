import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.scss']
})
export class ContactoComponent {
  nombre = '';
  correo = '';
  mensaje = '';

  // Cambia este número por el real con código de país (521 = México)
  private telefono = '521XXXXXXXXXX';

  enviarWhatsApp() {
    if (!this.nombre || !this.mensaje) return;

    const texto = `Hola Elí, soy ${this.nombre} (${this.correo}).\n\n${this.mensaje}`;
    const url = `https://wa.me/${this.telefono}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  }
}