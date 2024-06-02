import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './interface/IProduct';

@Injectable()
export class ProductsService { 
    constructor(
        private readonly productsRepository: ProductsRepository
    ) {}
    getProducts(page: number, limit: number) {
        return this.productsRepository.getProducts(page, limit)
    }

    getProductById(id: string) {
        return this.productsRepository.getProductById(id)
    }

    preLoadData() {
        return this.productsRepository.preLoadData()
    }
    createProduct(product) {
        return this.productsRepository.createProduct(product)

    }

    updateProduct(id: string, product) {
        return this.productsRepository.updateProduct(id, product)
    }

    deleteProduct(id: string){
        return this.productsRepository.deleteProduct(id)
    }
    
}
