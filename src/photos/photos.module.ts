import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosController } from './photos.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Photo } from './photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), CloudinaryModule],
  controllers: [PhotosController],
})
export class PhotosModule {}