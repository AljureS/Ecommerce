import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

    constructor(
        private readonly usersRepository: UsersRepository
    ) {}
    getUsers(page: number, limit: number) {
        return this.usersRepository.getUsers(page, limit)
    }
    
    getUserById(id: string) {
        return this.usersRepository.getUserById(id)
    }

    createUser(user) {
        return this.usersRepository.createUser(user)
    }

    updateUser(id: string, user) {
        return this.usersRepository.updateUser(id, user)
    }

    deleteUser(id: string) {
        return this.usersRepository.deleteUser(id)
    }
}

