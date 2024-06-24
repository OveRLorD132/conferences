"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("./Database/Postgres/Database"));
const Server_1 = __importDefault(require("./Server"));
const dotenv_1 = __importDefault(require("dotenv"));
const databaseConfig_1 = require("../config/databaseConfig");
const serverConfig_1 = require("../config/serverConfig");
dotenv_1.default.config();
async function createServer() {
    const SERVER_CONFIG = (0, serverConfig_1.createServerConfig)();
    const DATABASE_CONFIG = (0, databaseConfig_1.createDatabaseConfig)();
    const db = await Database_1.default.create(DATABASE_CONFIG);
    const server = new Server_1.default(db, SERVER_CONFIG);
    server.run();
    return server;
}
exports.default = createServer;
