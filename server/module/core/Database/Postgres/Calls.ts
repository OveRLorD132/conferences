import {PoolClient} from "pg";
import {CallRaw} from "../../../types";
import {ICalls} from "../../../types/db";

export default class Calls implements ICalls {
  private readonly _client: PoolClient;

  constructor(client: PoolClient) {
    this._client = client;
  }

  public async getCall(id: number): Promise<CallRaw> {
    const data = await this._client.query(`SELECT id, user_id FROM calls WHERE id = $1`, [id])

    return data.rows[0] as CallRaw;
  }
}