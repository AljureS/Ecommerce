import { Column, JoinColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({
    name: 'CATEGORIES'
})
export class Categories {
    @ApiProperty({
        description: 'The id of the category, generated by the database',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'The name of the category of that product',
    })
    @Column({ 
        length: 50, 
        type: 'varchar',
        nullable: false, 
        unique: true
    })
    name: string;

    @ApiProperty({
        description: 'The products of that category',
    })
    @OneToMany(() => Product, product => product.category)
    @JoinColumn()
    products: Product[]
}