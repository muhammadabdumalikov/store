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

  private _insert(values, options) {
    const { returning = ['*'], generateId = true } = options;
    // if (Array.isArray(values) && values.length > 0 && generateId) {
    //   values.forEach((value) => {
    //     value.id = this.generateRecordId();
    //   });
    // }
    // if (!Array.isArray(values) && generateId && !values.id) {
    //   values.id = this.generateRecordId();
    // }
    // if (generateId && values && Array.isArray(values)) {
    //   values = values.map((v) => ({ ...v, id: this.generateRecordId() }));
    // }
    return this.knex.insert(values).into(this._tableName).returning(returning);
  }

  insert(value: T, returning = ['*']): Knex.QueryBuilder<T> {
    return this._insert(value, { returning });
  }

  private _batchInsert(values, options, trx = null) {
    const { generateId = true, chunkSize = 500 } = options;
    // if (Array.isArray(values) && values.length > 0 && generateId) {
    //   values.forEach((value) => {
    //     value.id = this.generateRecordId();
    //   });
    // }
    // if (!Array.isArray(values) && generateId && !values.id) {
    //   values.id = this.generateRecordId();
    // }
    // if (generateId && values && Array.isArray(values)) {
    //   values = values.map((v) => ({ ...v, id: this.generateRecordId() }));
    // }
    return this.knex.batchInsert(this._tableName, values, chunkSize);
  }

  batchInsert(values, { returning = ['*'], chunkSize = 500 }, trx = null) {
    return this._batchInsert(values, { returning, chunkSize }, trx);
  }

  select(
    where,
    options: {
      limit?: number;
      offset?: number;
      columns?: any;
      order_by?: { column: string; order: 'asc' | 'desc'; use: boolean };
    } = {
      limit: 0,
      offset: 0,
      columns: ['*'],
      order_by: {
        column: 'created_at',
        order: 'asc',
        use: false,
      },
    },
  ): any {
    let query = this.knexService.instance
      .select(options.columns)
      .from(this._tableName)
      .where(where);

    if (options.limit) {
      query = query.limit(Number(options.limit));
    }

    if (options.offset) {
      query = query.offset(Number(options.offset));
    }

    if (options.order_by?.use) {
      query = query.orderBy(options.order_by.column, options.order_by.order);
    }

    return query;
  }

  update(where, values): Knex.QueryBuilder<T> {
    return this.knexService
      .instance(this._tableName)
      .update(values)
      .where(where);
  }

  updateById(id: string, value: T, returning = ['*']): Knex.QueryBuilder<T> {
    return this.knexService
      .instance(this._tableName)
      .update(value)
      .where('id', id)
      .returning(returning);
  }

  softDelete(id) {
    return this.knexService
      .instance(this._tableName)
      .update({ is_deleted: true })
      .where('id', id);
  }

  selectByEmail(email: string, columns = ['*']) {
    return this.knex
      .select(columns)
      .from(this._tableName)
      .where('email', email)
      .first();
  }

  async paginatedSelect(trx, page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;

    const results = await trx
      .select(this.knex.raw('COUNT(*) OVER() AS total_count'))
      .limit(pageSize)
      .offset(offset);

    const totalRecords =
      results.length > 0 ? parseInt(results[0].total_count, 10) : 0;
    const totalPages = Math.ceil(totalRecords / pageSize);

    // Remove total_count from each result item
    results.forEach((item) => delete item.total_count);

    return {
      data: results,
      pagination: {
        totalRecords,
        totalPages,
        currentPage: page,
        page_size: pageSize,
      },
    };
  }
}
