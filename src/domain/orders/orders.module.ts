import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepo } from './orders.repo';
import { ProductRepo } from '../product/product.repo';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepo, ProductRepo],
})
export class OrdersModule {}
