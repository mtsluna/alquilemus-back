import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

let instance: DataSource;

export const getDatasource = () => {

    if(instance == null) {
        instance = new DataSource({
            type: 'postgres',
            host: process.env.DB_PG_HOST || 'localhost',
            port: +(process.env.DB_PG_PORT || 5432),
            username: process.env.DB_PG_USER || 'myuser',
            password: process.env.DB_PG_PASS || 'mypassword',
            database: process.env.DB_PG_NAME || 'mydatabase',
            synchronize: true,
            logging: false,
            entities: ['src/entities/**/*.ts'],
            migrations: ['src/migrations/**/*.ts']
        })
    }

    return instance;
}