import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "./entity/Task";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "anton",
  password: "",
  database: "js_console_bot_db",
  synchronize: true,
  entities: [Task],
  migrations: ["src/migrations/*.ts"],
});
