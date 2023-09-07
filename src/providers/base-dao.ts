import { Knex } from 'knex';
import { KnexService } from './knex.service';
import ObjectID from 'bson-objectid';

// export interface IBaseQuery<T> {
//   selectById(id: string, columns?: string[]): Knex.QueryBuilder<T>;
// }

export class KnexBaseRepo {
  knexService: KnexService;

  constructor() {
    this.knexService = new KnexService();
  }

  get knex(): Knex {
    return this.knexService.instance;
  }

  generateRecordId() {
    return new ObjectID().toString();
  }
}

export class BaseRepo<T extends {}> extends KnexBaseRepo {
  _tableName: string;
  constructor(tableName: string) {
    super();
    this._tableName = tableName;
  }

  get getTableName() {
    return this._tableName;
  }

  selectById(id: string, columns = ['*']): Knex.QueryBuilder<T> {
    return this.knex
      .select(columns)
      .from(this._tableName)
      .where('id', id)
      .first();
  }

  _insert(values, options) {
    const { returning = ['*'], generateId = true } = options;
    if (Array.isArray(values) && values.length > 0 && generateId) {
      values.forEach((value) => {
        value.id = this.generateRecordId();
      });
    }
    if (!Array.isArray(values) && generateId && !values.id) {
      values.id = this.generateRecordId();
    }
    if (generateId && values && Array.isArray(values)) {
      values = values.map((v) => ({ ...v, id: this.generateRecordId() }));
    }
    return this.knex.insert(values).into(this._tableName).returning(returning);
  }

  insert(value: T, returning = ['*']): Knex.QueryBuilder<T> {
    return this._insert(value, { returning });
  }
}
