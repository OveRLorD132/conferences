"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const express_1 = __importDefault(require("express"));
const AdminAPI_1 = __importDefault(require("./AdminAPI"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use(new AdminAPI_1.default().getRouter());
dotenv_1.default.config();
const server = app.listen(3000);
(0, globals_1.test)("Testing admin routing", async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTYwNjE1NTQ0NjEsImV4cCI6MTcxNjA2MTU1NDQ2MSwic3ViIjoiMSJ9.xDxmtFRHWjG2-7-tbsXo67FQbOeuzfHifhmzfzJ-xr8";
    const { data } = await axios_1.default.get("http://localhost:3000/admin", {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    (0, globals_1.expect)(data).toEqual({ user: { id: '1' } });
    server.close();
});
