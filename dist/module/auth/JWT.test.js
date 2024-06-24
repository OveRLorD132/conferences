"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const JWT_1 = __importDefault(require("./JWT"));
(0, globals_1.test)("Testing Token Generation", () => {
    const token = JWT_1.default.generateToken('1', 'secret');
    const generated = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTYwNjE1NTQ0NjEsImV4cCI6MTcxNjA2MTU1NDQ2MSwic3ViIjoiMSJ9.xDxmtFRHWjG2-7-tbsXo67FQbOeuzfHifhmzfzJ-xr8";
    (0, globals_1.expect)(typeof token).toBe('string');
    (0, globals_1.expect)(() => JWT_1.default.decodeToken(token, 'secret')).not.toThrow();
    (0, globals_1.expect)(() => JWT_1.default.decodeToken(generated, 'secret')).not.toThrow();
    (0, globals_1.expect)(() => JWT_1.default.decodeToken(token, 'wrong secret')).toThrow();
    (0, globals_1.expect)(() => JWT_1.default.decodeToken(generated, 'wrong secret')).toThrow();
    (0, globals_1.expect)(() => JWT_1.default.decodeToken('wrong token', 'secret')).toThrow();
    (0, globals_1.expect)(() => JWT_1.default.decodeToken('wrong token', ' wrong secret')).toThrow();
    (0, globals_1.expect)(() => JWT_1.default.decodeToken(token + '123', ' wrong secret')).toThrow();
    (0, globals_1.expect)(() => JWT_1.default.decodeToken(token.split('.')[0], ' wrong secret')).toThrow();
    (0, globals_1.expect)(() => JWT_1.default.decodeToken(token.split('.')[1], ' secret')).toThrow();
    (0, globals_1.expect)(() => JWT_1.default.decodeToken(token.split('.')[2], ' wrong secret')).toThrow();
    (0, globals_1.expect)(() => JWT_1.default.decodeToken(token.split('.').join(','), ' secret')).toThrow();
    (0, globals_1.expect)(() => JWT_1.default.decodeToken(generated.split('.')[0], 'secret')).toThrow();
});
