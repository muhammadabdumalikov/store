import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  getAll() {
    return this.categoryService.getWithChildren();
  }

  @Get('parents')
  getAllParentCategories() {
    return this.categoryService.getAllParentCategories();
  }
}
