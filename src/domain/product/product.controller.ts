import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { IUser } from '../user/interface/user.interface';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization')
  @Post()
  create(@Body() params: CreateProductDto) {
    return this.productService.create(params);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() params: UpdateProductDto,
    @CurrentUser() user: IUser,
  ) {
    return this.productService.update(id, params, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser() user: IUser) {
    return this.productService.delete(id, user);
  }
}
