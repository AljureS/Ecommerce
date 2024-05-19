import { IsNotEmpty, IsUUID, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer'; // Importa Type para manejar la transformación de objetos dentro del array
import { Product } from 'src/entities/product.entity';

export class CreateOrderDto {
    /**
     * Este es el ID del usuario que crea la orden
     */
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    /**
     * Este es el arreglo de objetos de productos
     */
    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Product>[]; 
}
