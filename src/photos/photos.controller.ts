import { Controller, Post, Body, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Photo } from './photo.entity';

@Controller('photos')
export class PhotosController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  // Endpoint para subir foto y guardar datos
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { titulo: string; descripcion: string; categoria: string },
  ) {
    try {
      // 1. Sube la foto a Cloudinary
      const result = await this.cloudinaryService.uploadImage(file);

      // 2. Prepara la información para la base de datos
      const nuevaFoto = this.photoRepository.create({
        titulo: body.titulo,
        descripcion: body.descripcion,
        categoria: body.categoria,
        url_imagen: result.secure_url, // El link mágico de Cloudinary
      });

      // 3. Guarda en PostgreSQL
      await this.photoRepository.save(nuevaFoto);

      return {
        mensaje: '¡Foto y datos guardados con éxito!',
        foto: nuevaFoto,
      };
    } catch (error) {
      return { mensaje: 'Error al procesar la imagen', error };
    }
  }

  // Endpoint para obtener todas las fotos (Lo usará Angular)
  @Get()
  async getAllPhotos() {
    return await this.photoRepository.find({
      order: { fecha_subida: 'DESC' } // Las más recientes primero
    });
  }
}