import knex, { Knex } from 'knex';

export class KnexService {
  instance: Knex;

  constructor() {
    this.instance = knex({
      client: 'postgresql',
      connection: {
        host: 'tiny.db.elephantsql.com',
        database: 'hbbvqrol',
        password: '8UxRew7pJC38TkqJ9_ZyNpT09qhfsKBP',
        user: 'hbbvqrol',
      },
      pool: {
        min: 1,
        max: 3,
      },
    });
  }
}

// import knex, { Knex } from 'knex';

// export class KnexService {
//   instance: Knex;

//   constructor() {
//     this.instance = knex({
//       client: 'postgresql',
//       connection: {
//         host: 'localhost',
//         database: 'store',
//         password: '5432',
//         user: 'postgres',
//       },
//       pool: {
//         min: 2,
//         max: 75,
//       },
//     });
//   }
// }
