import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  ProductListByCategoryDto,
  UpdateProductDto,
} from './dto/product.dto';
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
  create(@Body() params: CreateProductDto, @CurrentUser() currentUser: IUser) {
    return this.productService.create(params, currentUser);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization')
  @Get('my')
  getUserProducts(@CurrentUser() user: IUser) {
    return this.productService.getUserProducts(user);
  }

  @Get('list-by-category')
  listByCategory(
    @Query() query: ProductListByCategoryDto,
    @CurrentUser() user: IUser,
  ) {
    return this.productService.listByCategory(query, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() params: UpdateProductDto,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.productService.update(id, params, currentUser);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser() user: IUser) {
    return this.productService.delete(id, user);
  }
}
