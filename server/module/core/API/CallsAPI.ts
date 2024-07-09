import {IRouter} from "../../types/server";
import {Router, Response} from "express";
import authCheck from "../../auth/auth_check";
import {SrvRequest} from "../../types/auth";
import {CallRaw} from "../../types";
import {ICalls} from "../../types/db";

export default class CallsAPI implements IRouter {
  private readonly _router: Router;
  private readonly _calls: ICalls;

  constructor(calls: ICalls) {
    this._router = Router();
    this._calls = calls;

    this._setupRoutes()
  }

  public getRouter(): Router {
    return this._router;
  }

  private _setupRoutes(): void {
    this._router.post('/api/call', authCheck, async (req: SrvRequest, res: Response) => {
      const { name, description, visibility } = req.body;
      if(!name || !description || !visibility) {
        return res.status(400).send({error: "Missing Params"});
      }

      try {
        const call: CallRaw = await this._calls.addCall({
          user_id: req.user!.id,
          name,
          description,
          visibility
        })

        res.status(200).send(call);
      } catch(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
    })
  }
}