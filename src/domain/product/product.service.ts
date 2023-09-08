import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepo } from './product.repo';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepo) {}

  async create(params: CreateProductDto) {
    return this.productRepo.insert({
      name_uz: params.name_uz,
      name_ru: params.name_ru,
      name_lat: params.name_lat,
      category_id: params.category_id,
      image: params.image_url,
      owner_id: params.owner_id,
      price: params.price,
      sale_price: params.sale_price,
      characteristic: params.characteristic,
      description: params.description,
      count: params.count,
    });
  }

  findAll() {
    return this.productRepo.select({ is_deleted: false }, { limit: 10 });
  }

  findOne(id: string) {
    return this.productRepo.selectById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  delete(id: string) {
    return this.productRepo.softDelete(id);
  }
}
