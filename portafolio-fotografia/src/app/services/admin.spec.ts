import { Component, inject } from '@angular/core';
import { AdminService } from '../services/admin';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  adminService = inject(AdminService); // Inyectamos el servicio

  toggleAdmin() {
    this.adminService.toggleAdmin();
  }
}