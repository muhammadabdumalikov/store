import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepo } from './category.repo';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepo) {}

  create(params: CreateCategoryDto) {
    return this.categoryRepo.insert({
      name_uz: params.name_uz,
      name_ru: params.name_ru,
      name_lat: params.name_lat,
      parent_id: params.parent_id,
      image: params.image_url,
    });
  }

  findAll() {
    return this.categoryRepo.select({ is_deleted: false }, { limit: 10 });
  }

  findOne(id: string) {
    return this.categoryRepo.selectById(id);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  delete(id: string) {
    return this.categoryRepo.softDelete(id);
  }
}
