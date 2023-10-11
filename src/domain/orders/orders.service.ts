import { Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderListDto } from './dto/order.dto';
import { OrdersRepo } from './orders.repo';
import { ProductRepo } from '../product/product.repo';
import { ProductNotFoundException } from 'src/errors/permission.error';
// import { KnexService } from 'src/providers/knex.service';
import { IUser } from '../user/interface/user.interface';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepo: OrdersRepo,
    private readonly productRepo: ProductRepo, // private readonly knexService: KnexService,
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
      price: product.price * params.count,
    });
  }

  async orderList(params: OrderListDto, currentUser: IUser) {
    return await this.orderRepo.select(
      {
        seller_id: currentUser.id,
        status: Number(params.status),
        is_deleted: false,
      },
      {
        limit: params.limit,
        offset: params.offset,
        order_by: { column: 'created_at', order: 'desc', use: true },
      },
    );
  }
}
