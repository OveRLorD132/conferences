import {PoolClient} from "pg";

export type DatabaseConfig = {
  user: string,
  password: string,
  host: string,
  port: number,
  database: string
}

export interface IDatabase {
  readonly client: PoolClient,

  end(): Promise<void>,
}