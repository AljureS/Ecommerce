import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { User } from './interface/IUser';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ){}
    // private users : User[] = [
    //     {
    //         id: "1",
    //         email: "johndoe@example.com",
    //         name: "John Doe",
    //         password: "encryptedPassword123",
    //         address: "123 Maple Street",
    //         phone: "555-1234",
    //         country: "USA",
    //         city: "Springfield"
    //     },
    //     {
    //         id: "2",
    //         email: "janedoe@example.com",
    //         name: "Jane Doe",
    //         password: "securePassword321",
    //         address: "456 Elm Street",
    //         phone: "555-5678",
    //         country: "Canada",
    //         city: "Toronto"
    //     },
    //     {
    //         id: "3",
    //         email: "alicejohnson@example.com",
    //         name: "Alice Johnson",
    //         password: "pass123Alice",
    //         address: "789 Oak Street",
    //         phone: "555-2345",
    //         country: "USA",
    //         city: "New York"
    //     },
    //     {
    //         id: "4",
    //         email: "bobsmith@example.com",
    //         name: "Bob Smith",
    //         password: "bobSecure456",
    //         address: "101 Pine Street",
    //         phone: "555-7890",
    //         country: "USA",
    //         city: "Chicago"
    //     },
    //     {
    //         id: "5",
    //         email: "carolwhite@example.com",
    //         name: "Carol White",
    //         password: "whiteCar123",
    //         address: "202 Birch Street",
    //         phone: "555-3456",
    //         country: "Canada",
    //         city: "Vancouver"
    //     },
    //     {
    //         id: "6",
    //         email: "davemiller@example.com",
    //         name: "Dave Miller",
    //         password: "millerDave321",
    //         address: "303 Cedar Road",
    //         phone: "555-8901",
    //         country: "USA",
    //         city: "Los Angeles"
    //     },
    //     {
    //         id: "7",
    //         email: "evawilson@example.com",
    //         name: "Eva Wilson",
    //         password: "evaSecure890",
    //         address: "404 Spruce Lane",
    //         phone: "555-4567",
    //         country: "USA",
    //         city: "Miami"
    //     },
    //     {
    //         id: "8",
    //         email: "frankmoore@example.com",
    //         name: "Frank Moore",
    //         password: "frankMoore654",
    //         address: "505 Walnut Street",
    //         phone: "555-0123",
    //         country: "Canada",
    //         city: "Montreal"
    //     },
    //     {
    //         id: "9",
    //         email: "gracelee@example.com",
    //         name: "Grace Lee",
    //         password: "graceLee432",
    //         address: "606 Maple Avenue",
    //         phone: "555-6789",
    //         country: "USA",
    //         city: "Seattle"
    //     },
    //     {
    //         id: "10",
    //         email: "henrydavis@example.com",
    //         name: "Henry Davis",
    //         password: "henryD987",
    //         address: "707 Elm Court",
    //         phone: "555-1230",
    //         country: "Canada",
    //         city: "Calgary"
    //     }
    // ]
    
    async getUsers(
        page: number,
        limit: number
    ) {
        const start = (page - 1) * limit
        const users = await this.usersRepository.find({
            take: limit,
            skip: start
        })

        return users.map(({password, ...userNoPassword}) => userNoPassword)

    }

    async getUserById(id: string) {
        const userID = await this.usersRepository.findOneBy({ id: id});
            if (!userID) {
                throw new NotFoundException(`User with ID ${id} not found.`)
            } else {
                const {password, isAdmin, ...userNoPassword} = userID
                return userNoPassword
            }
    }

    async createUser(user : Partial<Users>) {
        const newUser =await this.usersRepository.save(user)
        const dbUser = await this.usersRepository.findOneBy({id: newUser.id})
        const {password, ...userNoPassword} = dbUser
        // const {password, ...userNoPassword} = newUser
        return userNoPassword
    }

    async updateUser(id: string, user: Users) {

        // Ejecuta la actualización
        const updateResult = await this.usersRepository.update(id, user);
        
        // Verifica si se actualizó algún registro
        if (updateResult.affected === 0) {
            throw new NotFoundException(`No se encontró el usuario con ID ${id} o no se pudo actualizar.`);
        }

        // Recupera el usuario actualizado
        const updatedUser = await this.usersRepository.findOneBy({ id });
        if (!updatedUser) {
            throw new NotFoundException(`No se encontró el usuario con ID ${id} después de la actualización.`);
        }

        // Retorna el usuario sin incluir la contraseña
        const { password, ...userNoPassword } = updatedUser;
        return userNoPassword;
    }

    async deleteUser(id: string) {
        //?* const user = await this.usersRepository.findOneBy({id})
        //* user = await this.usersRepository.delete(user)
        const user = await this.usersRepository.delete({id})
        // const {password, ...userNoPassword} = user
        if (user.affected === 0) { //! => filas que fueron afectadas por el delete
            // Aquí puedes manejar el caso en que no se encontró el usuario para eliminar
            throw new Error("No se encontró el usuario con el ID proporcionado.");
        }
        return user
    }

    async getUserByEmail(email: string) {
        return await this.usersRepository.findOneBy({email})
    }
}