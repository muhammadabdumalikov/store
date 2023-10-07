import { Injectable } from '@nestjs/common';
import { CreateProductDto, ProductListByCategoryDto, UpdateProductDto } from './dto/product.dto';
import { ProductRepo } from './product.repo';
import { IUser } from '../user/interface/user.interface';
import {
  ProductNotFoundException,
  UserHasNotOwnerPermissionException,
} from 'src/errors/permission.error';
import { isEmpty } from 'lodash';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepo) { }

  async create(params: CreateProductDto, currentUser: IUser) {
    return this.productRepo.insert({
      name_uz: params.name_uz,
      name_ru: params.name_ru,
      name_lat: params.name_lat,
      category_id: params.category_id,
      image: params.image_url,
      owner_id: currentUser.id,
      price: params.price,
      sale_price: params.sale_price,
      characteristic: params.characteristic,
      description: params.description,
      count: params.count,
    });
  }

  getUserProducts(user: IUser) {
    return this.productRepo.select(
      { is_deleted: false, owner_id: user.id },
      { limit: 10 },
    );
  }

  listByCategory(params: ProductListByCategoryDto, user: IUser) {
    return this.productRepo.listByCategory(params, user);
  }

  findOne(id: string) {
    return this.productRepo.selectById(id);
  }

  async update(id: string, params: UpdateProductDto, currentUser: IUser) {
    const product = await this.productRepo.selectById(id);

    if (isEmpty(product)) {
      throw new ProductNotFoundException();
    }

    if (product.owner_id !== currentUser.id) {
      throw new UserHasNotOwnerPermissionException();
    }

    return await this.productRepo.updateById(id, {
      name_uz: params.name_uz,
      name_ru: params.name_ru,
      name_lat: params.name_lat,
      image: params.image_url,
      price: params.price,
      sale_price: params.sale_price,
      characteristic: params.characteristic,
      description: params.description,
      count: params.count,
    });
  }

  async delete(id: string, user: IUser) {
    const product = await this.productRepo.selectById(id);

    if (isEmpty(product)) {
      throw new ProductNotFoundException();
    }

    if (product.owner_id !== user.id) {
      throw new UserHasNotOwnerPermissionException();
    }

    await this.productRepo.softDelete(id);

    return { success: true };
  }
}
