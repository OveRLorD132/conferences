import {expect, test} from "@jest/globals";
import Database from "./Database";
import {IDatabase} from "../../../types/db";
import {createDatabaseConfig} from "../../../config/databaseConfig";
import dotenv from "dotenv";
import Calls from "./Calls";
import {CallRaw} from "../../../types";
import {global} from "../../../../../global";
import CallCreated = global.CallCreated;

dotenv.config();


test("Testing Calls Table", async () => {
  const db: IDatabase = await Database.create(createDatabaseConfig());
  const calls = new Calls(db.client);

  const call: CallCreated = {
    user_id: '4',
    name: 'Name',
    description: 'Description',
    visibility: 'public'
  }

  const added: CallRaw = await calls.addCall(call)

  await expect(calls.getCall(added.id)).resolves.toEqual({
    id: added.id,
    user_id: '4',
    name: 'Name',
    description: 'Description',
    visibility: 'public'
  });

  await expect((calls.deleteCall(added.id))).resolves.not.toThrow();

  await db.end();
})