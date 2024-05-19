import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './orders.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/roles.enum';

@ApiTags('Orders')

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ) {}

    @ApiBearerAuth()
    @Get(':id') 
    @Roles(Role.User, Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @UseGuards(AuthGuard)
    getOrder(@Param('id') ParseUUIDPipe, id: string) {
        return this.ordersService.getOrder(id)
    } 

    @ApiBearerAuth()
    @Post() 
    @Roles(Role.User, Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    addOrder(@Body() order: CreateOrderDto) {
        const {userId, products} = order
        return this.ordersService.addOrder(userId, products)
    }

}
