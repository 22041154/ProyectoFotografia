import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('photos') // Así se llamará la tabla en PostgreSQL
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column()
  categoria: string; // ej: 'bodas', 'retratos', 'paisajes'

  @Column()
  url_imagen: string; // Aquí guardaremos el link de Cloudinary

  @CreateDateColumn()
  fecha_subida: Date;
}