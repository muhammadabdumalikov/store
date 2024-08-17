import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';
import { ListPageDto } from 'src/shared/dto/list.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get('children/:parent_id')
  getAll(@Param('parent_id') parent_id: string) {
    return this.categoryService.getWithChildren(parent_id);
  }

  @Post('parents')
  getAllParentCategories(@Body() params: ListPageDto) {
    return this.categoryService.getAllParentCategories(params);
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }
}
