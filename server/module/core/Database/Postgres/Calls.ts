import {PoolClient} from "pg";
import {CallRaw} from "../../../types";
import {ICalls} from "../../../types/db";
import {global} from "../../../../../global";
import CallCreated = global.CallCreated;

export default class Calls implements ICalls {
  private readonly _client: PoolClient;

  constructor(client: PoolClient) {
    this._client = client;
  }

  public async addCall(call: CallCreated): Promise<CallRaw> {
    const data = await this._client.query(`INSERT INTO calls (user_id, name, description, visibility)
      VALUES ($1, $2, $3, $4) RETURNING id, user_id, name, description, visibility`,
      [call.user_id, call.name, call.description, call.visibility])

    return data.rows[0] as CallRaw;
  }

  public async getCall(id: string): Promise<CallRaw> {
    const data = await this._client.query(`SELECT id, user_id, name, description, visibility FROM calls WHERE id = $1`, [id])

    return data.rows[0] as CallRaw;
  }

  public async deleteCall(id: string): Promise<void> {
    await this._client.query(`DELETE FROM calls WHERE id = $1`, [id]);
  }
}