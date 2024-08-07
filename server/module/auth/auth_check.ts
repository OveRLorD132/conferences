import {NextFunction, Request, Response} from "express";
import JWT from "./JWT";
import {SrvRequest} from "../types/auth";

export default function authCheck(req: SrvRequest, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.replace(`Bearer `, '');
  if(!token) {
    res.status(401).json({error: 'No token provided'});
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
    res.status(401).send({
      error: 'Not Authorized',
      message: (err as Error).message
    });
    return;
  }
}