import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { OrdersRepo } from './orders.repo';
import { ProductRepo } from '../product/product.repo';
import { ProductNotFoundException } from 'src/errors/permission.error';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepo: OrdersRepo,
    private readonly productRepo: ProductRepo,
  ) {}

  async createOrder(params: CreateOrderDto) {
    const product = await this.productRepo.selectById(params.product_id);

    if (!product) {
      throw new ProductNotFoundException();
    }

    return await this.orderRepo.insert({
      seller_id: product.owner_id,
      product_id: params.product_id,
      client_data: {
        first_name: params.client_first_name,
        last_name: params.client_last_name,
        phone: params.client_phone,
      },
      count: params.count,
      price: params.price,
    });
  }
}
