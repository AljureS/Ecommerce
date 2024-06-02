import { registerAs } from '@nestjs/config';
import {config as dotenvConfig} from 'dotenv';
import { DataSource, DataSourceOptions, Entity } from 'typeorm';
dotenvConfig({path: '.development.env'});

const config ={
    type: 'postgres',
    // host: process.env.DB_HOST, 
    host: 'postgresdb',  
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password:  process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
        //*aqui decimos que las entidades estan en dist y no tenemos que declararlas una por una
    migrations: ['dist/migrations/*{.ts,.js}'], 
        //*aqui decimos que las migraciones estan en dist y no tenemos que declararlas una por una
    logging: true, //instruccciones Sql en consola
    synchronize: true, //sincornizar con la base de datos //* a false en prod
    // dropSchema: true, // a false en produccion
}

export default registerAs('typeorm', () => config) // obj de config de typeorm //* lo añade a la configuracion de nest JS 
export const connectionSource = new DataSource(config as DataSourceOptions) // crea nueva instancia con esa configuracion
