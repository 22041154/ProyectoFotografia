import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { SemblanzaComponent } from './components/semblanza/semblanza';
import { PortafolioComponent } from './components/portafolio/portafolio';
import { PaquetesComponent } from './components/paquetes/paquetes';
import { ContactoComponent } from './components/contacto/contacto';
import { LoginModalComponent } from './components/login-modal/login-modal';
import { InicioComponent } from './components/inicio/inicio';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    InicioComponent,
    SemblanzaComponent,
    PortafolioComponent,
    PaquetesComponent,
    ContactoComponent,
    LoginModalComponent,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {}