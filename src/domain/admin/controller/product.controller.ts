import { Controller, Post, Body, UseGuards, Get, Param, Delete } from '@nestjs/common';
import { AdminProductService } from '../service/product.service';
import { SetProductStatusDto } from '../dto/product-admin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guard/admin.guard';
import { ProductService } from 'src/domain/product/product.service';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { IUser } from 'src/domain/user/interface/user.interface';

@ApiTags('Admin')
@ApiBearerAuth('authorization')
@UseGuards(AdminGuard)
@Controller('admin/product')
export class AdminProductController {
  constructor(
    private readonly adminProductService: AdminProductService,
    private readonly productService: ProductService,
  ) {}

  @Post('set-status')
  async setStatus(@Body() params: SetProductStatusDto) {
    return this.adminProductService.setStatus(params);
  }

  @Get('list')
  async list() {
    return this.adminProductService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.adminProductService.delete(id);
  }
}
