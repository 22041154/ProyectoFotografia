import { Component, inject } from '@angular/core';
import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-packages',
  imports: [],
  templateUrl: './packages.html',
  styleUrl: './packages.css',
})
export class Packages {
  adminService = inject(AdminService);

}
