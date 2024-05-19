import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryRepository } from './cloudinary.respository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [CloudinaryController],
  providers: [
    CloudinaryService,
    CloudinaryConfig,
    CloudinaryRepository
  ]
})
export class CloudinaryModule {}
