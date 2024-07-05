import {expect, test} from "@jest/globals";
import createServer from "./createServer";
import Server from "./Server";
import axios from "axios";
import {IHttpServer} from "../types/server";

test("Server Creation", async () => {
  const server: IHttpServer = await createServer();
  expect(server).toBeInstanceOf(Server);

  await expect(axios.head('http://localhost:3000/')).resolves.not.toThrow();
  await server.close();
})