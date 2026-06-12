import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css'
})
export class Portfolio implements OnInit {
  adminService = inject(AdminService);
  http = inject(HttpClient); 
  categorias = signal<any[]>([{ id: 'todos', name: 'Todos' }]);
  categoriaSeleccionada = signal('Todos');

  fotos = signal<any[]>([]);

  fotoSeleccionada = signal<any>(null);
  
  archivoSeleccionado: File | undefined;

  fotosFiltradas = computed(() => {
    const actual = this.categoriaSeleccionada();
    if (actual === 'Todos') return this.fotos();
    return this.fotos().filter(foto => foto.categoria === actual); 
  });
  ngOnInit() {
    this.cargarCategorias();
    this.cargarFotos(); 
  }
  cargarCategorias() {
    this.http.get<any[]>('https://api-portafolio-04g4.onrender.com/categories').subscribe(data => {
      this.categorias.set([{ id: 'todos', name: 'Todos' }, ...data]);
    });
  }

  seleccionarCategoria(nombre: string) {
    this.categoriaSeleccionada.set(nombre);
  }

  agregarCategoria(nuevaCat: string) {
    const name = nuevaCat.trim();
    if (name) {
      this.http.post('https://api-portafolio-04g4.onrender.com/categories', { name }).subscribe(() => {
        this.cargarCategorias(); 
      });
    }
  }

  eliminarCategoria(id: string) {
    if (id === 'todos') return; 

    this.http.delete(`https://api-portafolio-04g4.onrender.com/categories/${id}`).subscribe(() => {
      this.cargarCategorias(); 
      this.categoriaSeleccionada.set('Todos'); 
    });
  }
  cargarFotos() {
    this.http.get<any[]>('https://api-portafolio-04g4.onrender.com/photos').subscribe(data => {
      this.fotos.set(data);
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.archivoSeleccionado = file;
    }
  }

  agregarFoto(titulo: string, camara: string, categoria: string, descripcion: string) {
    if (!titulo || !categoria || !this.archivoSeleccionado) {
      alert('Por favor, llena el título, la categoría y selecciona una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('camara', camara);
    formData.append('categoria', categoria);
    formData.append('descripcion', descripcion);
    formData.append('file', this.archivoSeleccionado);

    this.http.post('https://api-portafolio-04g4.onrender.com/photos', formData).subscribe(() => {
      this.cargarFotos(); 
      this.archivoSeleccionado = undefined; 
      alert('¡Foto subida y guardada con éxito!');
    });
  }

  eliminarFoto(id: string, evento: Event) {
    evento.stopPropagation(); 
    
    if(confirm('¿Estás seguro de eliminar esta foto?')) {
      this.http.delete(`https://api-portafolio-04g4.onrender.com/photos/${id}`).subscribe(() => {
        this.cargarFotos(); 
      });
    }
  }

  abrirModal(foto: any) {
    this.fotoSeleccionada.set(foto);
    document.body.style.overflow = 'hidden'; 
  }

  cerrarModal() {
    this.fotoSeleccionada.set(null);
    document.body.style.overflow = 'auto'; 
  }
}
