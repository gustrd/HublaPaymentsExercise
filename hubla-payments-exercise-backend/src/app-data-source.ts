import { env } from "process"
import { DataSource } from "typeorm"
import * as dotenv from 'dotenv';
import { Transaction } from "./model/transaction.entity";
import { Init1679070662170 } from "./migration/1679070662170-20230317_init";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.POSTGRES_HOST,
    port: parseInt(env.POSTGRES_PORT),
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DATABASE,
    entities: [Transaction],
    migrations: [Init1679070662170]
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    });