import {IUsers} from "../../../types/db";
import {PoolClient} from "pg";
import {global} from "../../../../../global";
import Register = global.Register;
import User = global.User;
import Profile = global.Profile;

export default class Users implements IUsers {
  private readonly _client: PoolClient;

  constructor(client: PoolClient) {
    this._client = client;
  }

  async addUser(user: Register): Promise<User> {
    const data = await this._client.query(`INSERT INTO users (username, email, password) 
      VALUES ($1, $2, $3) RETURNING id, username, email, password`,
      [user.username, user.email, user.password]);

    return data.rows[0] as User;
  }
  async getProfileById(id: number): Promise<Profile> {
    const data = await this._client.query(`SELECT id, username, email FROM users WHERE id = $1`, [id]);

    return data.rows[0] as Profile;
  }
  async getUser(id: number): Promise<User> {
    const data = await this._client.query(`SELECT id, username, email, password FROM users WHERE id = $1`, [id]);

    return data.rows[0] as User;
  }
  async getByEmail(email: string): Promise<User> {
    const data = await this._client.query(`SELECT id, username, email, password FROM users WHERE email = $1`, [email]);

    return data.rows[0] as User;
  }
  async getByUsername(username: string): Promise<User> {
    const data = await this._client.query(`SELECT id, username, email, password FROM users WHERE username = $1`, [username]);

    return data.rows[0] as User;
  }
  async deleteUser(id: number): Promise<void> {
    await this._client.query(`DELETE FROM users WHERE id = $1`, [id]);
  }
}