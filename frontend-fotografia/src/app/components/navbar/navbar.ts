import { Component } from '@angular/core';
import { LoginModalService } from '../../services/login-modal/login-modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
  constructor(private loginModalService: LoginModalService) {}

  abrirLogin() {
    this.loginModalService.abrir();
  }
}