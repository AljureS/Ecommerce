import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './loginUser.dto';
import { createUserDto } from 'src/users/users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization and authentication')
@Controller('auth') 
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // @Get()
    // getAuth() {
    //     return this.authService.getAuth();
    // } 

    @Post('signin')
    loginUser(@Body() credentials: LoginUserDto) {
        const { email, password } = credentials;
        return this.authService.loginUser(email , password);
    }

    @Post('signup')
    signUp(@Body() user: createUserDto) {
        return this.authService.signUp(user);
    }

    @Put('update/:id')
    updateRole(@Param('id') ParseUUIDPipe, id: string) {
        return this.authService.updateRole(id);
    }
}
