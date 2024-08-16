// import knex, { Knex } from 'knex';

// export class KnexService {
//   instance: Knex;

//   constructor() {
//     this.instance = knex({
//       client: 'postgresql',
//       connection: {
//         host: 'john.db.elephantsql.com',
//         database: 'zrdldrse',
//         password: 'vW-QMd6vea2sG9HRJxwexLS8heaQVX97',
//         user: 'zrdldrse',
//       },
//       pool: {
//         min: 1,
//         max: 3,
//       },
//     });
//   }
// }

import knex, { Knex } from 'knex';

export class KnexService {
  instance: Knex;

  constructor() {
    this.instance = knex({
      client: 'postgresql',
      connection: {
        host: '45.10.154.95',
        database: 'stroymarket',
        password: '4324',
        user: 'postgres',
        port: 5433,
      },
      pool: {
        min: 2,
        max: 75,
      },
    });
  }
}
