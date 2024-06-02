import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interface/IUser';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { createUserDto } from './users.dto'; 
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './roles.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users') 
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
        
    ) {} 
    
    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    // Agrego en la metadata que es un admin
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(
        @Query('page') page: string,
        @Query('limit') limit: string
    ) {
        if (!page && !limit) {
            return this.usersService.getUsers(1, 5);
        } else if(!page && limit){
            return this.usersService.getUsers(1, Number(limit));
        } else if (page && !limit) {
            return this.usersService.getUsers(Number(page), 5);
        } else return this.usersService.getUsers(Number(page), Number(limit));
    }

    @ApiBearerAuth()
    @Get(':id')
    @Roles(Role.Admin, Role.User)
    @UseGuards(AuthGuard, RolesGuard)
    getUserById(@Param('id') ParseUUIDPipe ,id: string) {
        return this.usersService.getUserById((id));
    }

    
    // @Post()
    // createUser(@Body() user: createUserDto) {
    //     return this.usersService.createUser(user);
    // }

    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    updateUser(@Param('id') ParseUUIDPipe, id: string, @Body() user: Partial<createUserDto>){
        return this.usersService.updateUser(id, user);
    }
    
    @ApiBearerAuth()    
    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    deleteUser(@Param('id') ParseUUIDPipe, id: string) {
        return this.usersService.deleteUser(id);
    }

}
