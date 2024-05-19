import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: 'USERS'
})
export class Users {
    @ApiProperty({
        description: 'The id of the user, generated by the database',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'The name of the user',
    })
    @Column({ 
        length: 50,
        type: 'varchar',
        nullable: false, 
    })
    name: string;

    @ApiProperty({
        description: 'The email of the user',
    })
    @Column({
        length: 50, 
        unique: true,
        type: 'varchar',
        nullable: false, 
    })
    email: string;

    @ApiProperty({
        description: 'The hashed password of the user',
    })
    @Column({
        length: 130 ,
        unique: true,
        type: 'varchar',
        nullable: false, 
    })
    password: string;  

    @ApiProperty({
        description: 'The phone number of the user',
    })
    @Column({
        type: 'bigint',
    })
    phone: number

    @ApiProperty({
        description: 'The country of the user',
    })
    @Column({
        length: 50,
        type: 'varchar'
    })
    country: string

    @ApiProperty({
        description: 'The address of the user',
    })
    @Column({
        type: 'text', 
    })
    address: string

    @ApiProperty({
        description: 'The city of the user',
    })
    @Column({
        length: 50, 
        type: 'varchar'
    })
    city: string

    @ApiProperty({
        description: 'The type of role of the user',
    })
    @Column({
        default: false
    })
    isAdmin: boolean

    @ApiProperty({
        description: 'The orders of the user',
    })
    @OneToMany(() => Orders, order => order.user)
    @JoinColumn({name: 'order_id'})
    orders: Orders[]

}