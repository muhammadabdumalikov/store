import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { AdminCategoryService } from '../service/category.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guard/admin.guard';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/domain/admin/dto/category-admin.dto';

@ApiTags('Admin')
@UseGuards(AdminGuard)
@ApiBearerAuth('authorization')
@Controller('admin/category')
export class AdminCategoryController {
  constructor(private readonly adminCategoryService: AdminCategoryService) {}

  @Post()
  create(@Body() params: CreateCategoryDto) {
    return this.adminCategoryService.create(params);
  }

  @Patch(':id')
  async update(@Param('id') id: string, params: UpdateCategoryDto) {
    return this.adminCategoryService.update(id, params);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.adminCategoryService.delete(id);
  }
}
