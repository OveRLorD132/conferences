"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class RentAPI {
    _router;
    _rent;
    constructor(rent) {
        /** @private */
        this._router = (0, express_1.Router)();
        this._rent = rent;
        this._setupRoutes();
    }
    getRouter() {
        return this._router;
    }
    _setupRoutes() {
        this._router.get('/api/rent', async (_, res) => {
            try {
                const list = await this._rent.getList();
                res.status(200).send({
                    success: true,
                    list
                });
            }
            catch (err) {
                res.status(500).send({
                    success: false,
                    error: err.message
                });
            }
        });
    }
}
exports.default = RentAPI;
