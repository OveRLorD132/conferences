import {Pool, PoolClient} from "pg";
import {ServerConfig} from "../../../types/server";
import {DatabaseConfig, IDatabase} from "../../../types/db";

export default class Database implements IDatabase {
  private readonly _pool: Pool;

  public readonly client: PoolClient

  private constructor(pool: Pool, client: PoolClient) {
    this._pool = pool;

    this.client = client;
  }

  public static async create(config: DatabaseConfig): Promise<IDatabase> {
    const pool = new Pool(config);

    return new Database(pool, await pool.connect());
  }

  public async end(): Promise<void> {
    this.client.release();
    await this._pool.end();
  }
}