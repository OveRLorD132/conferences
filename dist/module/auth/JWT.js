"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("node:crypto"));
class JWT {
    static generateToken(id, secret, ttl) {
        const header = this._base64url(JSON.stringify(this._generateHeader()));
        const payload = this._base64url(JSON.stringify(this._generatePayload(id, ttl)));
        const signature = this._escape(this._generateSignature(header, payload, secret));
        return `${header}.${payload}.${signature}`;
    }
    static decodeToken(token, secret) {
        const [, payload, signature] = token.split('.');
        const decoded = this._decodePayload(payload);
        const header = this._base64url(JSON.stringify(this._generateHeader()));
        const expectedSignature = this._escape(this._generateSignature(header, payload, secret));
        if (expectedSignature !== signature)
            throw new Error(`Invalid JWT`);
        return decoded.sub;
    }
    /** Signature generation
     * @function _generateSignature
     * @param {string} header - Encrypted header
     * @param {string} payload - Encrypted payload
     * @param {string} secret - Secret word to encode
     * @returns {string} Encoded signature
     * */
    static _generateSignature(header, payload, secret) {
        return crypto.createHmac('SHA256', secret)
            .update(`${header}.${payload}`)
            .digest('base64');
    }
    static _generatePayload(id, exp) {
        const timestamp = Date.now();
        return {
            iat: timestamp,
            exp: timestamp + (exp ? exp : 0),
            sub: id
        };
    }
    static _decodePayload(payload) {
        const base64 = this._base64(payload);
        let decoded;
        try {
            decoded = JSON.parse(Buffer.from(base64, 'base64').toString());
        }
        catch (err) {
            throw new Error('Invalid JWT format');
        }
        if (!decoded.iat || !decoded.exp || decoded.sub === '')
            throw new Error('Invalid JWT format');
        if (decoded.iat !== decoded.exp && Date.now() - decoded.exp > 0)
            throw new Error('Token Expired');
        return decoded;
    }
    static _generateHeader() {
        return {
            alg: 'HS256',
            typ: "JWT"
        };
    }
    static _base64url(str) {
        const encoded = Buffer.from(str).toString("base64");
        return this._escape(encoded);
    }
    static _base64(str) {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4 !== 0) {
            base64 += '=';
        }
        return base64;
    }
    static _escape(str) {
        return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }
}
exports.default = JWT;
