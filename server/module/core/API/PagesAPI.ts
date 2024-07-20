import { IRouter } from "../../types/server";
import {Router} from "express";
import path from "path";

export default class PagesAPI implements IRouter {
  private readonly _router: Router;
  private readonly _root: string;

  constructor() {
    this._router = Router();

    this._root = path.resolve(__dirname, "..", '..', '..', '..');
    this._setupRoutes();
  }

   public getRouter(): Router {
    return this._router;
   }

  private _setupRoutes(): void {
    this._router.get('/', (req, res) => {
      res.sendFile(path.resolve(this._root, 'public/index.html'));
    })
  }
}