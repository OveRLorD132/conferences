import {IRouter} from "../../types/server";
import e, {Router} from "express";
import authCheck from "../../auth/auth_check";
import {SrvRequest} from "../../types/auth";

export default class AdminAPI implements IRouter {
  private readonly _router: Router;

  constructor() {
    this._router = Router();

    this._setupRoutes();
  }

  public getRouter(): Router {
    return this._router;
  }

  private _setupRoutes(): void {
    this._router.get('/admin', authCheck, (req, res) => {
      const user = (req as SrvRequest).user
      res.status(200).send({ user });
    })
  }
}