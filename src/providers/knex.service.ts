import knex, { Knex } from "knex";

export class KnexService {
  instance: Knex;

  constructor() {
    this.instance = knex({
      client: 'postgresql',
      connection: {
        host: 'localhost',
        database: 'store',
        password: '5432',
        user: 'postgres'
      },
      pool: {
        min: 1,
        max: 3,
      },
    })
  }
}