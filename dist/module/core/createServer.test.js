"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const createServer_1 = __importDefault(require("./createServer"));
const Server_1 = __importDefault(require("./Server"));
const axios_1 = __importDefault(require("axios"));
(0, globals_1.test)("Server Creation", async () => {
    const server = await (0, createServer_1.default)();
    (0, globals_1.expect)(server).toBeInstanceOf(Server_1.default);
    (0, globals_1.expect)(async () => {
        await axios_1.default.head('http://localhost:3000/page');
        await server.close();
    }).not.toThrow();
});
