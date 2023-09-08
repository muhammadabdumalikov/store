import { Injectable } from '@nestjs/common';
import { AdminCategoryRepo } from '../repo/category.repo';

@Injectable()
export class AdminCategoryService {
  constructor(private readonly adminCategoryRepo: AdminCategoryRepo) { }

  create(params) {
    return 'This action adds a new admin';
  }
}
