import * as crypto from "node:crypto";
import {TokenHeader, TokenPayload} from "../types/auth";

export default abstract class JWT {
  public static generateToken(id: string, secret: string, ttl?: number): string {
    const header: string = this._base64url(JSON.stringify(this._generateHeader()));
    const payload: string = this._base64url(JSON.stringify(this._generatePayload(id, ttl)));

    const signature = this._escape(this._generateSignature(header, payload, secret));

    return `${header}.${payload}.${signature}`;
  }
  public static decodeToken(token: string, secret: string): string {
    const [, payload, signature] = token.split('.');

    const decoded: TokenPayload = this._decodePayload(payload);
    const header: string = this._base64url(JSON.stringify(this._generateHeader()));

    const expectedSignature: string = this._escape(this._generateSignature(header, payload, secret));
    if(expectedSignature !== signature) throw new Error(`Invalid JWT`);

    return decoded.sub;
  }

  /** Signature generation
   * @function _generateSignature
   * @param {string} header - Encrypted header
   * @param {string} payload - Encrypted payload
   * @param {string} secret - Secret word to encode
   * @returns {string} Encoded signature
   * */
  private static _generateSignature(header: string, payload: string, secret: string): string {
    return crypto.createHmac('SHA256', secret)
      .update(`${header}.${payload}`)
      .digest('base64');
  }

  private static _generatePayload(id: string, exp?: number): TokenPayload {
    const timestamp = Date.now();

    return {
      iat: timestamp,
      exp: timestamp + (exp ? exp : 0),
      sub: id
    }
  }

  private static _decodePayload(payload: string): TokenPayload {
    const base64 = this._base64(payload);
    let decoded;

    try {
      decoded = JSON.parse(Buffer.from(base64, 'base64').toString());
    } catch (err) {
      throw new Error('Invalid JWT format');
    }
    if(!decoded.iat || !decoded.exp || decoded.sub === '') throw new Error('Invalid JWT format');
    if(decoded.iat !== decoded.exp && Date.now() - decoded.exp > 0) throw new Error('Token Expired');

    return decoded;
  }

  private static _generateHeader(): TokenHeader {
    return {
      alg: 'HS256',
      typ: "JWT"
    }
  }

  private static _base64url(str: string): string {
    const encoded = Buffer.from(str).toString("base64");

    return this._escape(encoded);
  }

  private static _base64(str: string): string {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');

    while(base64.length % 4 !== 0) {
      base64 += '=';
    }

    return base64;
  }

  private static _escape(str: string): string {
    return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  }

}