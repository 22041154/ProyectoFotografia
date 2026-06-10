import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  isAdmin = signal(false);

  toggleAdmin() {
    this.isAdmin.set(!this.isAdmin());
  }
}