import {expect, test} from "@jest/globals";
import Database from "./Database";
import {createDatabaseConfig} from "../../../config/databaseConfig";
import dotenv from "dotenv";

dotenv.config();

test("Database Connect", async() => {
  const db = await Database.create(createDatabaseConfig());

  expect(db).toBeDefined();

  expect(async () => await db.client.query('SELECT 1')).not.toThrow();
})