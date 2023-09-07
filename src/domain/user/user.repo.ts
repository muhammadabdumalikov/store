import { Injectable } from '@nestjs/common';
import { BaseRepo } from 'src/providers/base-dao';

@Injectable()
export class UserRepo extends BaseRepo<any> {
  constructor() {
    super('user');
  }
}
