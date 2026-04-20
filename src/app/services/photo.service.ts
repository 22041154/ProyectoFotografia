import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PhotoService {
  private url = 'http://localhost:3000/photos'; // La URL de tu NestJS

  constructor(private http: HttpClient) {}

  getPhotos(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  uploadPhoto(titulo: string, categoria: string, archivoSeleccionado: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', archivoSeleccionado);
    formData.append('titulo', titulo);
    formData.append('categoria', categoria);

    return this.http.post(`${this.url}/upload`, formData);
  }
}
