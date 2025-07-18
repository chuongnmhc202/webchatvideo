import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "./entities/UserEntity";
import { Friend } from "./entities/FriendEntity";
import { Group } from "./entities/GroupEntity";
import { GroupMember } from "./entities/GroupMemberEntity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost", 
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "pass",
  database: process.env.DB_DATABASE || "user",
  logging: ["query"],
  synchronize: false,
  entities: [User, Friend, Group, GroupMember],
  subscribers: [],
  migrations: ["src/database/migrations/*.ts"],
});
