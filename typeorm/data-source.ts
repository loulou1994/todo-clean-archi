// needed for typeorm support
import "reflect-metadata"

import { DataSource } from "typeorm";
import { User } from "./models/user";
import { Task } from "./models/task";
import { Category } from "./models/category";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "loulou1994",
    database: "sales",
    entities: [User, Category, Task],
    synchronize: true,
    logging: false,
    // subscribers: [],
    // migrations: [],
})