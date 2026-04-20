import { Component } from '@angular/core';
import { GaleriaComponent } from './components/galeria/galeria';
import { UploadComponent } from './components/upload/upload';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GaleriaComponent, UploadComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'frontend-fotografia';
}