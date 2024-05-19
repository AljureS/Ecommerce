import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetails } from "src/entities/oderDetails.entity";
import { Orders } from "src/entities/orders.entity";
import { Product } from "src/entities/product.entity";
import { Users } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Orders)
        private readonly ordersRepository: Repository<Orders>,
        @InjectRepository(OrderDetails)
        private readonly orderDetailsRepository: Repository<OrderDetails>,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) {}

    async addOrder (userId: string, products: any) {
        let total = 0 
        //encuentro usuario  
        const user = await this.usersRepository.findOneBy({id: userId})
        if (!user) {
            return `Ususario con el id ${userId} no existe`
        }
        //? EXTRA: VALIDAR SI EXITEN LOS PRODUCTOS
        // Crea un registro en la tabla orders con el usuario encontrado.
        const order = new Orders()
        order.date = new Date()
        order.user = user

        const newOrder = await this.ordersRepository.save(order)
        //aSOCIAR CADA ID RECIBIDO CON EL PRODUCTO 
        const productsArray = await Promise.all( //*=> Recibe un arreglo de promesas y las resuelve en orden.
            products.map(async(element)=>{
                // Valida si existen los productos
                const product = await this.productsRepository.findOneBy({
                    id: element.id
                })

                if (!product) {
                    return `El producto con el id ${element.id} no existe`
                }
                if (product.stock === 0) {
                    return `El producto con el id ${element.id} no tiene stock`
                }
                // Se calcula eel precio total
                total += Number(product.price)
                // Actualoiza el stock 
                await this.productsRepository.update(
                    {id: element.id},
                    {stock: product.stock - 1}
                )
                return product
            }),
            
        )
        
        const orderDetails = new OrderDetails()
        orderDetails.price = Number(Number(total).toFixed(2))//*=> 2 decimales 
        orderDetails.products = productsArray
        orderDetails.orders = newOrder
        await this.orderDetailsRepository.save(orderDetails)

        //Le enviamos al cliente la compra con la info de los productos 
        return await this.ordersRepository.find({
            where: {id: newOrder.id},
            relations:{
                orderDetails: true 
            }
        })
    }

    async getOrder(id: string){
        const order = this.ordersRepository.findOne({
            where: {id},
            relations: {
                orderDetails: {
                    products: true
                }
            }
        })
        if (!order) {
            return `La orden con el id ${id} no existe`
        } else return order
    }

}