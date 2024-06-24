import {expect, test} from "@jest/globals";
import express from "express";
import AdminAPI from "./AdminAPI";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
app.use(new AdminAPI().getRouter());

dotenv.config();

const server = app.listen(3000);

test("Testing admin routing", async () => {

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTYwNjE1NTQ0NjEsImV4cCI6MTcxNjA2MTU1NDQ2MSwic3ViIjoiMSJ9.xDxmtFRHWjG2-7-tbsXo67FQbOeuzfHifhmzfzJ-xr8"

  const { data } = await axios.get("http://localhost:3000/admin", {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  expect(data).toEqual({ user: { id: '1' } });

  server.close()
})