import {IRouter, ServerConfig} from "../../types/server";
import {Router, Response} from "express";
import {IAuth, SrvRequest, Tokens} from "../../types/auth";
import JWT from "../../auth/JWT";
import {IUsers} from "../../types/db";
import Auth from "../../auth/Auth";
import authCheck from "../../auth/auth_check";
import {DatabaseError} from "pg";

export default class AuthAPI implements IRouter {
  private readonly _router: Router;
  private readonly _users: IUsers;
  private readonly _config: ServerConfig;
  private readonly _auth: IAuth;

  constructor(users: IUsers, config: ServerConfig) {
    this._router = Router();
    this._users = users;
    this._config = config;
    this._auth = new Auth(users, config);

    this._setupRoutes()
  }

  public getRouter(): Router {
    return this._router;
  }

  private _setupRoutes(): void {
    this._router.post("/api/login", async (req: SrvRequest, res: Response) => {
      const { email, password } = req.body;
      if(!email || !password) return res.status(400).send({error: "Missing Credentials"});

      try {
        const tokens: Tokens = await this._auth.authenticate(email, password);

        return res.status(200).send({
          success: true,
          tokens
        });
      } catch (err) {
        if((err as Error).message === 'User not found' ||
          (err as Error).message === 'Invalid password')
          return res.status(400).send({error: (err as Error).message});

        return res.status(500).send({error: "Internal Server Error"});
      }
    })

    this._router.get('/api/user', authCheck, async (req: SrvRequest, res: Response) => {
      const id = req.user!.id;
      const user = await this._users.getProfileById(+id!);

      return res.status(200).send(user);
    })

    this._router.post('/api/registration', async (req: SrvRequest, res: Response) => {
      const { username, email, password } = req.body;
      if(!username || !email || !password) return res.status(400).send({error: "Missing Properties"});

      try {
        const tokens: Tokens = await this._auth.register(username, email, password);

        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).send({
          success: true,
          tokens
        })
      } catch (err) {
        if((err as DatabaseError).constraint === 'email_unique') return res.status(400).send({error: "This email is already taken"});
        if((err as DatabaseError).constraint === 'username_unique') return res.status(400).send({error: "This username is already taken"});

        return res.status(500).send("Internal Server Error");
      }

    })
  }
}
