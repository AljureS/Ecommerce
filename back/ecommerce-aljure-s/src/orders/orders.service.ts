import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.respository';

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository
    ) {}

    addOrder(userId: string, products: any) {
        return this.ordersRepository.addOrder(userId, products)
    }

    getOrder(id: string) {
        return this.ordersRepository.getOrder(id)
    }
}
