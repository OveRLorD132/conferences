import {NextFunction, Request, Response} from "express";
import JWT from "./JWT";
import {SrvRequest} from "../types/auth";

export default function authCheck(req: SrvRequest, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.replace(`Bearer `, '');
  if(!token) {
    res.status(403).json({error: 'No token provided'});
    return;
  }

  const secret = process.env.JWT_SECRET;
  if(!secret) {
    res.status(500).send('Internal Server Error');
    return;
  }

  try {
    const id = JWT.decodeToken(token, secret);

    req.user = {id};

    next();
  } catch (err) {
    res.status(403).send('Not Authenticated');
    return;
  }
}