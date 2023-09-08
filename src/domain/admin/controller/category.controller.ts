import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AdminCategoryService } from '../service/category.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guard/admin.guard';

@ApiTags('Admin')
@UseGuards(AdminGuard)
@ApiBearerAuth('authorization')
@Controller('admin/category')
export class AdminCategoryController {
  constructor(private readonly adminCategoryService: AdminCategoryService) { }

  @Post()
  create(@Body() params) {
    return this.adminCategoryService.create(params);
  }
}
