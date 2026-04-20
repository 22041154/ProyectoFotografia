import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosModule } from './photos/photos.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:eliaramburofotografia@db.oyylmnkqozqppwzyynco.supabase.co:5432/postgres', // Pega aquí la URL de tu base de datos
      autoLoadEntities: true,
      synchronize: true, // IMPORTANTE: Solo para desarrollo. Crea las tablas automáticamente.
    }),
    PhotosModule,
    CloudinaryModule,
  ],
})
export class AppModule {}