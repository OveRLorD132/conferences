"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const Database_1 = __importDefault(require("./Database"));
const databaseConfig_1 = require("../../../config/databaseConfig");
const Rent_1 = __importDefault(require("./Rent"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, globals_1.test)("Testing list loading", async () => {
    Database_1.default.create((0, databaseConfig_1.createDatabaseConfig)()).then(async (client) => {
        const rent = new Rent_1.default(client);
        const list = await rent.getList();
        (0, globals_1.expect)(list.length > 0).toBeTruthy();
        (0, globals_1.expect)(list[0]).toHaveProperty('id');
        await client.end();
    });
});
