import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './interface/IProduct';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/roles.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(
        private readonly productService: ProductsService,

    ) {}

    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin, Role.User)
    @UseGuards(AuthGuard, RolesGuard)
    getProducts(
        @Query('page') page: string,
        @Query('limit') limit: string
    ) {
        if (!page && !limit) {
            return this.productService.getProducts(1, 5);
        } else if (!page && limit){
            return this.productService.getProducts(1, Number(limit));
        } else if (page && !limit) {
            return this.productService.getProducts(Number(page), 5);
        } else return this.productService.getProducts(Number(page), Number(limit));
        
    }

    @ApiTags('Preload Products')
    @ApiBearerAuth()
    @Get('seeder')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    preLoadData() {
        return this.productService.preLoadData()
    }
    
    @ApiBearerAuth()
    @Get(':id')
    @Roles(Role.Admin, Role.User)
    @UseGuards(AuthGuard, RolesGuard)
    getProductById(@Param('id') ParseUUIDPipe ,id: string) {
        return this.productService.getProductById(id)
    }

    // @ApiBearerAuth()
    // @Post()
    // @Roles(Role.Admin)
    // @UseGuards(AuthGuard, RolesGuard)
    // createProduct(@Body() product: Partial<Product>) {
    //     return this.productService.createProduct(product)
    // }

    // @Put(':id')
    // @Roles(Role.Admin)
    // @UseGuards(AuthGuard, RolesGuard)
    // updateProduct(@Param('id') ParseUUIDPipe , id: string, @Body() product) {
    //     return this.productService.updateProduct(id, product)
    // }

    // @Delete(':id')
    // @UseGuards(AuthGuard)
    // deleteProduct(@Param('id') ParseUUIDPipe , id: string) {
    //     return this.productService.deleteProduct(id)
    // }
}
