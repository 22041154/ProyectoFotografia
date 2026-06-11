import { Component, inject } from '@angular/core';
import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  adminService = inject(AdminService); 

  toggleAdmin() {
    this.adminService.logout();
  }
}
