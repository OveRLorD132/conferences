"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const AdminAPI_1 = __importDefault(require("./API/AdminAPI"));
const PagesAPI_1 = __importDefault(require("./API/PagesAPI"));
const RentAPI_1 = __importDefault(require("./API/RentAPI"));
const Rent_1 = __importDefault(require("./Database/Postgres/Rent"));
class Server {
    /** @private */
    _http;
    /** @readonly */
    _server;
    _db;
    _config;
    constructor(db, config) {
        this._db = db;
        this._config = config;
        this._server = (0, express_1.default)();
        this._server.use(express_1.default.static(path_1.default.resolve('public')));
        this._setupRouters();
    }
    run() {
        this._http = this._server.listen(this._config.port);
        return this._http;
    }
    async close() {
        if (!this._http)
            throw new Error("Server is not running");
        await this._db.end();
        this._http.close();
    }
    _setupRouters() {
        const rentTable = new Rent_1.default(this._db);
        const admin = new AdminAPI_1.default();
        const pages = new PagesAPI_1.default();
        const rent = new RentAPI_1.default(rentTable);
        this._server.use(admin.getRouter());
        this._server.use(pages.getRouter());
        this._server.use(rent.getRouter());
    }
}
exports.default = Server;
