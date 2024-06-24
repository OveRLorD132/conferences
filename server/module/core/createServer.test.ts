import {expect, test} from "@jest/globals";
import createServer from "./createServer";
import Server from "./Server";
import axios from "axios";

test("Server Creation", async () => {
  const server = await createServer();
  expect(server).toBeInstanceOf(Server);

  expect(async () => {
    await axios.head('http://localhost:3000/page');
    await server.close();
  } ).not.toThrow();
})