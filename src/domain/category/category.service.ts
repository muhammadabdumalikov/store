import { Injectable } from '@nestjs/common';
import { CategoryRepo } from './category.repo';
import { GetChildCategoriesDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepo) {}

  findAll() {
    return this.categoryRepo.select({ is_deleted: false }, { limit: 10 });
  }

  findOne(id: string) {
    return this.categoryRepo.selectById(id);
  }

  getWithChildren(id) {
    return this.categoryRepo.getWithChildren(id);
  }

  async getAllParentCategories() {
    return this.categoryRepo.getAllParentCategories();
  }
}
