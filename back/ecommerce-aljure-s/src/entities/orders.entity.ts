import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./user.entity";
import { OrderDetails } from "./oderDetails.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: 'ORDERS'
})
export class Orders {
    @ApiProperty({
        description: 'The id of the order, generated by the database',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        description: 'The user that made the order',
    })
    @ManyToOne(() => Users, user => user.orders)
    @JoinColumn({name: 'user_id'})
    user: Users 

    @ApiProperty({
        description: 'The date of the order',
        example: '07/12/2024',
    })
    @Column()
    date: Date;

    @ApiProperty({
        description: 'The details of the order',
    })
    @OneToOne(() => OrderDetails, orderDetails => orderDetails.orders)
    orderDetails: OrderDetails
}