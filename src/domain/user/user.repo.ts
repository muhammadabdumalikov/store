import { Injectable } from '@nestjs/common';
import { BaseRepo } from 'src/providers/base-dao';

@Injectable()
export class UserRepo extends BaseRepo<any> {
  constructor() {
    super('users');
  }

  selectByPhone(phone: string, columns = ['*']) {
    return this.knex
      .select(columns)
      .from(this._tableName)
      .where('phone', phone)
      .first();
  }

  selectByEmail(email: string, columns = ['*']) {
    return this.knex
      .select(columns)
      .from(this._tableName)
      .where('email', email)
      .first();
  }
}
