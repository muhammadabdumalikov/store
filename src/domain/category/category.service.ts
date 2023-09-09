import { Injectable } from '@nestjs/common';
import { CategoryRepo } from './category.repo';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepo) {}

  findAll() {
    return this.categoryRepo.select({ is_deleted: false }, { limit: 10 });
  }

  findOne(id: string) {
    return this.categoryRepo.selectById(id);
  }
}
