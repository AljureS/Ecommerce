import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";
import { Repository } from "typeorm";
import * as data from '../utils/data.json'


@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Categories)
        private readonly categoriesRepository: Repository<Categories>
    ) {}

    async getCategories() {
        return await this.categoriesRepository.find();
    }

    async addCategories(){
        data?.map(async (element) =>{
            await this.categoriesRepository
                .createQueryBuilder() // para crear la consulta SQL 
                .insert() // insercion de datos 
                .into(Categories) // En esa entidad van los datos 
                .values({name: element.category}) // valor que va en entidad 
                .orIgnore() // no inserta si ya existe
                .execute() //finaliza y ejecuta consulta 
        })
        return 'Categorias cargadas'
    }
}