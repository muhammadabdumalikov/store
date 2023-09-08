import { Injectable } from '@nestjs/common';
import { BaseRepo } from 'src/providers/base-dao';

@Injectable()
export class ProductRepo extends BaseRepo<any> {
  constructor() {
    super('products');
  }
}
