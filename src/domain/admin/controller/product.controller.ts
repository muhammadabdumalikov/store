import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AdminProductService } from '../service/product.service';
import { SetProductStatusDto } from '../dto/product-admin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guard/admin.guard';

@ApiTags('Admin')
@ApiBearerAuth('authorization')
@UseGuards(AdminGuard)
@Controller('admin/product')
export class AdminProductController {
  constructor(private readonly adminProductService: AdminProductService) { }

  @Post('set-status')
  async setStatus(@Body() params: SetProductStatusDto) {
    return this.adminProductService.setStatus(params);
  }
}
