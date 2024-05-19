import { Injectable, NotFoundException } from '@nestjs/common';
//import { Product } from './interface/IProduct';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json'

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(Product) 
        private readonly productsRepository: Repository<Product>,
        @InjectRepository(Categories)
        private readonly categoriesRepository: Repository<Categories>,
    ) {}
    // private products: Product[] = [
    //     {
    //         id: "1",
    //         name: "Smartphone X2000",
    //         description: "Latest model with AI camera and super fast charging.",
    //         price: 499.99,
    //         stock: true,
    //         imgUrl: "https://example.com/products/smartphone-x2000.jpg"
    //     },
    //     {
    //         id: "2",
    //         name: "Electric Kettle EZBoil",
    //         description: "Fast boiling with energy saving technology.",
    //         price: 29.99,
    //         stock: false,  // Indicating it is currently out of stock
    //         imgUrl: "https://example.com/products/electric-kettle.jpg"
    //     },
    //     {
    //         id: "3",
    //         name: "Wireless Earbuds SoundWave",
    //         description: "High-quality sound and noise cancellation features.",
    //         price: 199.99,
    //         stock: true,
    //         imgUrl: "https://example.com/products/wireless-earbuds.jpg"
    //     },
    //     {
    //         id: "4",
    //         name: "Smart Watch HealthPro",
    //         description: "Tracks your health metrics and syncs with your devices.",
    //         price: 299.99,
    //         stock: true,
    //         imgUrl: "https://example.com/products/smart-watch.jpg"
    //     },
    //     {
    //         id: "5",
    //         name: "Portable Charger PowerGo",
    //         description: "Keep your devices charged on the go with high-capacity battery.",
    //         price: 49.99,
    //         stock: true,
    //         imgUrl: "https://example.com/products/portable-charger.jpg"
    //     },
    //     {
    //         id: "6",
    //         name: "Gaming Laptop GX7000",
    //         description: "Top performance for gaming and professional work.",
    //         price: 1499.99,
    //         stock: true,
    //         imgUrl: "https://example.com/products/gaming-laptop.jpg"
    //     },
    //     {
    //         id: "7",
    //         name: "Bluetooth Speaker BeatBox",
    //         description: "Room-filling sound with deep bass and wireless connectivity.",
    //         price: 129.99,
    //         stock: true,
    //         imgUrl: "https://example.com/products/bluetooth-speaker.jpg"
    //     },
    //     {
    //         id: "8",
    //         name: "Action Camera Xtreme",
    //         description: "Capture your adventures with 4K video and waterproof design.",
    //         price: 399.99,
    //         stock: false,
    //         imgUrl: "https://example.com/products/action-camera.jpg"
    //     },
    //     {
    //         id: "9",
    //         name: "Smart Thermostat E-Control",
    //         description: "Automate your heating and save energy with AI.",
    //         price: 249.99,
    //         stock: true,
    //         imgUrl: "https://example.com/products/smart-thermostat.jpg"
    //     },
    //     {
    //         id: "10",
    //         name: "Robot Vacuum CleanEase",
    //         description: "Effortless cleaning with smart navigation and app control.",
    //         price: 599.99,
    //         stock: false,
    //         imgUrl: "https://example.com/products/robot-vacuum.jpg"
    //     }
    // ]

    async getProducts(page: number, limit: number): Promise<Product[]> {
        let products = await this.productsRepository.find({
            relations: {
                category: true
            }
        })

        const start = ((page - 1) * limit)
        const end = start + limit

        products = products.slice(start, end)
        return await products // Aca iria la query a la BD
    }

    async getProductById(id: string): Promise<Product | string> {
        const productID = await this.productsRepository.findOneBy({id})

        if (!productID) {
            return 'No se encontro ese producto'
        }
        return productID

    }

    async createProduct(product) {
        const category = await this.categoriesRepository.findOne({
            where: { name: product.category }
        });
        if (!category) {
            throw new Error('Categoría no encontrada');
        }
        const newProduct = new Product();
        newProduct.name = product.name;
        newProduct.description = product.description;
        newProduct.price = product.price;
        newProduct.stock = product.stock;
        newProduct.imgUrl = product.imgUrl;
        newProduct.category = category;

        await this.productsRepository.save(newProduct)
        return newProduct
    }

    async preLoadData(/*product: Omit<Product, 'id'>*/) { //! se esta precargando la info, por eso no recibe
        // Verificar si existe esa categoria 
        const categories = await this.categoriesRepository.find();
        data?.map(async (element) => {
            const category = categories.find(
                (category) => category.name === element.category
            )
            // Se necesita crear el producto que va en database
        const newProduct = new Product()
        newProduct.name = element.name
        newProduct.description = element.description
        newProduct.price = element.price
        newProduct.imgUrl = element.imgUrl
        newProduct.stock = element.stock
        newProduct.category = category

        //aÑADIR ESTO A LA BD
        await this.productsRepository
            .createQueryBuilder() // para crear la consulta SQL 
            .insert() // insercion de datos 
            .into(Product) // En esa entidad van los datos 
            .values(newProduct) // valor que va en entidad 
            //.orIgnore() // no inserta si ya existe //? si ya existe se actualiza =>
            .orUpdate(
                [ "description", "price", "imgUrl", "stock"],["name"] //* name no se actualiza
            )
            .execute()
        })

        return 'Producto creado'
    }

    async updateProduct(id: string, product: Partial<Product>) {
        const existProduct = await this.productsRepository.findOneBy({id})
        if (!existProduct) {
            return 'Product with that id not found '
        }
        
        await this.productsRepository.update(id, product) //que y con que lo actualizo 

        const updatedProduct = await this.productsRepository.findOneBy({id})

        return updatedProduct
    }

    async deleteProduct(id: string) {
        const result = await this.productsRepository.delete(id);
        
        return 'Producto eliminado';
    }
}