"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rent {
    db;
    constructor(db) {
        this.db = db;
    }
    async getList() {
        const ads = await this.db.client.query(`SELECT id, price, type, description, header, user_id, users.first_name, is_hidden
      FROM rental_properties AS prop JOIN users ON users.id = prop.user_id
      WHERE is_hidden = 0`);
        return ads.rows;
    }
}
exports.default = Rent;
