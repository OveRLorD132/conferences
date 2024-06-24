"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const Database_1 = __importDefault(require("./Database"));
const databaseConfig_1 = require("../../../config/databaseConfig");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, globals_1.test)("Database Connect", async () => {
    const db = await Database_1.default.create((0, databaseConfig_1.createDatabaseConfig)());
    (0, globals_1.expect)(db).toBeDefined();
    (0, globals_1.expect)(async () => await db.client.query('SELECT 1')).not.toThrow();
});
