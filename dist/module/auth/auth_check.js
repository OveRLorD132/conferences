"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JWT_1 = __importDefault(require("./JWT"));
function authCheck(req, res, next) {
    const token = req.headers['authorization']?.replace(`Bearer `, '');
    if (!token) {
        res.status(403).json({ error: 'No token provided' });
        return;
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        res.status(500).send('Internal Server Error');
        return;
    }
    try {
        const id = JWT_1.default.decodeToken(token, secret);
        req.user = { id };
        next();
    }
    catch (err) {
        res.status(403).send('Not Authenticated');
        return;
    }
}
exports.default = authCheck;
