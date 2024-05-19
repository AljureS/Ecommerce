import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryRepository } from './cloudinary.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CloudinaryService {
	constructor(
        private readonly cloudinaryRepository: CloudinaryRepository,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ) {}

    async uploadImage(file: Express.Multer.File, productId: string) {
        //Verificar la existencia del producto 
        const product = await this.productsRepository.findOneBy({id: productId});
        if (!product) {
            throw new NotFoundException(`Product with ID ${productId} not found.`);
        }
        //* => query a cloudinary
        const response = await this.cloudinaryRepository.uploadImage(file);

        //* => update en la base de datos
        if (!productId) {
            throw new NotFoundException('Product ID is null.');
        }
        const updateResult = await this.productsRepository.update({id: productId}, {
            imgUrl: response.secure_url
        })
        console.log(updateResult);
        

        const foundProduct = await this.productsRepository.findOneBy({id: productId});
        return foundProduct
    }
}
