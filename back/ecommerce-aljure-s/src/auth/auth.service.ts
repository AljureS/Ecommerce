import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt'
import { createUserDto } from 'src/users/users.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor (
        private readonly userRepository: UsersRepository,
        private readonly jwtService: JwtService,

        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) {}

    async getAuth (){
        return 'Get Auth'
    }

    async loginUser(email: string, password: string){ 
        const user = await this.userRepository.getUserByEmail(email)
        if (!user) { 
            throw new BadRequestException('Invalid credentials')
        }
        // Comparacion de passwords
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            throw new BadRequestException('Invalid credentials')
        }
        //envio de token //* forma token
        const payload = {id: user.id, email: user.email, isAdmin: user.isAdmin}
        const token = await this.jwtService.sign(payload)
        //Retornar mensaje de ingreso y token 
        return {
            message: 'Logged user',
            token
        }

    }

    async signUp (user: createUserDto){
        const { email, password} = user
        // Verificar si el email esta registrado 
        const userEmail = await this.userRepository.getUserByEmail(email)// llamda al repository de users 
        if (userEmail) { 
            throw new BadRequestException('Email already registered')
        }
        
        //REGISTRO ----
        //* Hashear password 
        const hashedPassword = await bcrypt.hash(password, 10)

        //*BBDD
        return await this.userRepository.createUser({...user, password: hashedPassword})
    }

    async updateRole(id: string) {
        const userID = await this.usersRepository.findOneBy({ id: id})

        if (!userID) {
            throw new NotFoundException(`User with ID ${id} not found.`)
        }
        
        const updateResult = await this.usersRepository.update(id, {isAdmin: false});
        return updateResult
        // if (userID.isAdmin === false) {
        //     const updateResult = await this.usersRepository.update(id, {isAdmin: true});
        //     return updateResult
        // } else {
        //     return updateResult
        // }
    }
}

