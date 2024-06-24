"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServerConfig = void 0;
function createServerConfig() {
    if (!process.env.PORT)
        throw new Error("Environment Error. No port specified.");
    return {
        port: Number(process.env.PORT),
    };
}
exports.createServerConfig = createServerConfig;
