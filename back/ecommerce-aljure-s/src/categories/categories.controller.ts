import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @ApiTags('Preload Categories')
    @ApiBearerAuth()
    @Get('seeder') 
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    addCategories() {
        return this.categoriesService.addCategories()
    }

    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin, Role.User)
    @UseGuards(AuthGuard, RolesGuard)
    getCategories() {
        return this.categoriesService.getCategories()
    }

}
