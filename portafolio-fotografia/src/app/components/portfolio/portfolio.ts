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
  http = inject(HttpClient); // Herramienta para conectarnos al backend

  // La lista ahora guarda objetos con ID y Nombre, manteniendo "Todos" por defecto
  categorias = signal<any[]>([{ id: 'todos', name: 'Todos' }]);
  categoriaSeleccionada = signal('Todos');

  // Iniciamos la lista de fotos vacía, esperando a que lleguen de Firebase
  fotos = signal<any[]>([]);

  // --- LÓGICA DEL VISOR DE FOTOS (MODAL) ---
  // Guardará la información de la foto a la que se le dio clic
  fotoSeleccionada = signal<any>(null);

  fotosFiltradas = computed(() => {
    const actual = this.categoriaSeleccionada();
    if (actual === 'Todos') return this.fotos();
    return this.fotos().filter(foto => foto.categoria === actual); 
  });

  // Se ejecuta automáticamente al abrir la página
  ngOnInit() {
    this.cargarCategorias();
    this.cargarFotos(); // Cargamos las fotos al iniciar
  }

  // --- MÉTODOS DE CATEGORÍAS (BACKEND) ---

  cargarCategorias() {
    this.http.get<any[]>('http://localhost:3000/categories').subscribe(data => {
      // Unimos el botón fijo "Todos" con la información real de Firebase
      this.categorias.set([{ id: 'todos', name: 'Todos' }, ...data]);
    });
  }

  seleccionarCategoria(nombre: string) {
    this.categoriaSeleccionada.set(nombre);
  }

  agregarCategoria(nuevaCat: string) {
    const name = nuevaCat.trim();
    if (name) {
      // Enviamos el nombre al backend por POST
      this.http.post('http://localhost:3000/categories', { name }).subscribe(() => {
        this.cargarCategorias(); // Recargamos la lista automáticamente
      });
    }
  }

  eliminarCategoria(id: string) {
    if (id === 'todos') return; 

    // Eliminamos del backend usando el ID único de Firebase
    this.http.delete(`http://localhost:3000/categories/${id}`).subscribe(() => {
      this.cargarCategorias(); 
      this.categoriaSeleccionada.set('Todos'); // Reseteamos el filtro visual
    });
  }

  // --- MÉTODOS DE FOTOS (BACKEND) ---

  cargarFotos() {
    this.http.get<any[]>('http://localhost:3000/photos').subscribe(data => {
      this.fotos.set(data);
    });
  }

  agregarFoto(titulo: string, camara: string, categoria: string, url: string, descripcion: string) {
    // Validación básica para que no envíen fotos vacías
    if (!titulo || !url || !categoria) {
      alert('Por favor, llena al menos el título, la categoría y el enlace.');
      return;
    }

    const nuevaFoto = { titulo, camara, categoria, url, descripcion };

    this.http.post('http://localhost:3000/photos', nuevaFoto).subscribe(() => {
      this.cargarFotos(); // Recargamos la galería
      alert('¡Foto guardada con éxito!');
    });
  }

  eliminarFoto(id: string, evento: Event) {
    evento.stopPropagation(); // Evita clics accidentales en otros elementos
    
    if(confirm('¿Estás seguro de eliminar esta foto?')) {
      this.http.delete(`http://localhost:3000/photos/${id}`).subscribe(() => {
        this.cargarFotos(); 
      });
    }
  }

  // --- MÉTODOS PARA ABRIR Y CERRAR EL MODAL ---

  abrirModal(foto: any) {
    this.fotoSeleccionada.set(foto);
    document.body.style.overflow = 'hidden'; // Evita que la página haga scroll atrás
  }

  cerrarModal() {
    this.fotoSeleccionada.set(null);
    document.body.style.overflow = 'auto'; // Regresa el scroll a la página
  }
}