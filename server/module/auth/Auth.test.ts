import {expect, test} from "@jest/globals";
import Auth from "./Auth";
import {IDatabase, IUsers} from "../types/db";
import Database from "../core/Database/Postgres/Database";
import {createDatabaseConfig} from "../config/databaseConfig";
import dotenv from "dotenv";
import Users from "../core/Database/Postgres/Users";
import {IAuth, Tokens} from "../types/auth";
import {createServerConfig} from "../config/serverConfig";
import {global} from "../../../global";
import User = global.User;

dotenv.config();

test("Testing Auth class", async () => {
  const db: IDatabase = await Database.create(createDatabaseConfig())
  const users: IUsers = new Users(db.client);
  const auth: IAuth = new Auth(users, createServerConfig());

  const tokens: Tokens = await auth.authenticate('email', 'password');

  expect(tokens).toBeDefined();

  await expect(auth.authenticate('invalid user email', 'password')).rejects.toBeDefined();
  await expect(auth.authenticate('email', 'invalid password')).rejects.toBeDefined();

  const tokensRegister: Tokens = await auth.register('new user', 'user@email', 'password');

  await expect(auth.authenticate('user@email', 'password')).resolves.not.toThrow();
  await expect(auth.authenticate('user@email', 'wrong password')).rejects.toThrow();

  const newUser: User = await users.getByUsername('new user');

  expect(newUser).toBeDefined();

  await users.deleteUser(newUser.id);

  await db.end();
})