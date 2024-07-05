import {expect, test} from "@jest/globals";
import Database from "./Database";
import {IDatabase} from "../../../types/db";
import {createDatabaseConfig} from "../../../config/databaseConfig";
import dotenv from "dotenv";
import Calls from "./Calls";

dotenv.config();

test("Testing Calls Table", async () => {
  const db: IDatabase = await Database.create(createDatabaseConfig());
  const calls = new Calls(db.client);

  await expect(calls.getCall(1)).resolves.toEqual({id: "1", user_id: "4"});

  await db.end();
})