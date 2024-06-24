"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
class PagesAPI {
    _router;
    _root;
    constructor() {
        this._router = (0, express_1.Router)();
        this._root = path_1.default.resolve(__dirname, "..", '..', '..', '..');
        this._setupRoutes();
    }
    getRouter() {
        return this._router;
    }
    _setupRoutes() {
        this._router.get('/', (req, res) => {
            res.sendFile(path_1.default.resolve(this._root, 'public/js/main/browser/main.html'));
        });
    }
}
exports.default = PagesAPI;
