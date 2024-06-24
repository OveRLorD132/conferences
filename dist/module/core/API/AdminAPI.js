"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_check_1 = __importDefault(require("../../auth/auth_check"));
class AdminAPI {
    _router;
    constructor() {
        this._router = (0, express_1.Router)();
        this._setupRoutes();
    }
    getRouter() {
        return this._router;
    }
    _setupRoutes() {
        this._router.get('/admin', auth_check_1.default, (req, res) => {
            const user = req.user;
            res.status(200).send({ user });
        });
    }
}
exports.default = AdminAPI;
