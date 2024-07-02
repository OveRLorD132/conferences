import {expect, jest, test} from "@jest/globals";
import dotenv from "dotenv";
import {DatabaseConfig, IDatabase} from "../../../types/db";
import {createDatabaseConfig} from "../../../config/databaseConfig";
import Database from "./Database";
import Users from "./Users";
import {global} from "../../../../../global";
import Register = global.Register;
import {PoolClient} from "pg";

dotenv.config();
const config: DatabaseConfig = createDatabaseConfig();

let id: number;
const username = 'overlord';
const email = 'overlord@overlord.com';
const password = 'password';

test("Testing add user", async () => {
  const database: IDatabase = await Database.create(config);
  const users = new Users(database.client);

  const user: Register = {
    username,
    email,
    password,
  }

  const inserted = await users.addUser(user);

  id = inserted.id;

  expect(inserted).toEqual({
    id,
    username,
    email,
    password
  })

  await database.end();
})

test("Testing get user", async () => {
  const database: IDatabase = await Database.create(config);
  const users = new Users(database.client);

  let user = await users.getUser(id);

  expect(user).toEqual({
    id,
    username,
    email,
    password
  })

  const profile = await users.getProfileById(id);

  expect(profile).toEqual({
    id,
    username,
    email
  })

  user = await users.getByUsername(username);

  expect(user).toEqual({
    id,
    username,
    email,
    password
  })

  user = await users.getByEmail(email);

  expect(user).toEqual({
    id,
    username,
    email,
    password
  })

  await database.end();
})

test("Testing delete user", async () => {
  const database: IDatabase = await Database.create(config);
  const users = new Users(database.client);

  await users.deleteUser(id);

  const user = await users.getUser(id);

  expect(user).not.toBeDefined();

  await database.end();
})

