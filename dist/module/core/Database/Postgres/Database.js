"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class Database {
    _pool;
    client;
    constructor(pool, client) {
        this._pool = pool;
        this.client = client;
    }
    static async create(config) {
        const pool = new pg_1.Pool(config);
        return new Database(pool, await pool.connect());
    }
    async end() {
        this.client.release();
        await this._pool.end();
    }
}
exports.default = Database;
