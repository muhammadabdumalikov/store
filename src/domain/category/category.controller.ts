import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get('childs/:id')
  getAll(@Param('id') id: string) {
    return this.categoryService.getWithChildren(id);
  }

  @Get('parents')
  getAllParentCategories() {
    return this.categoryService.getAllParentCategories();
  }
}
