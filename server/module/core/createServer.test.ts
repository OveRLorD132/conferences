import {expect, test} from "@jest/globals";
import createServer from "./createServer";
import Server from "./Server";
import axios from "axios";

test("Server Creation", async () => {
  const server = await createServer();
  expect(server).toBeInstanceOf(Server);

  await expect(axios.head('http://localhost:3000/')).resolves.not.toThrow();
  await server.close();
})