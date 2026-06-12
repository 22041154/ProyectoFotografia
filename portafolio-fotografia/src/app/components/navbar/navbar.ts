import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin';
import { Login } from '../login/login';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, Login],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  adminService = inject(AdminService);
  showLoginModal = signal(false);

  constructor() {
    effect(() => {
      if (this.adminService.isAdmin() && this.showLoginModal()) {
        this.showLoginModal.set(false);
      }
    });
  }

  toggleAdmin() {
    if (this.adminService.isAdmin()) {
      this.adminService.logout();
    } else {
      this.showLoginModal.set(true);
    }
  }

  closeLoginModal() {
    this.showLoginModal.set(false);
  }
}
