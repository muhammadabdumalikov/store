import { Module } from '@nestjs/common';
import { AdminProductService } from './service/product.service';
import { AdminCategoryController } from './controller/category.controller';
import { AdminProductController } from './controller/product.controller';
import { AdminCategoryService } from './service/category.service';
import { AdminCategoryRepo } from './repo/category.repo';
import { AdminProductRepo } from './repo/product.repo';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { ProductModule } from '../product/product.module';
import { AdminUserService } from './service/user.service';
import { AdminUserRepo } from './repo/user.repo';
import { AdminUserController } from './controller/user.controller';
import { OrdersRepo } from '../orders/orders.repo';

@Module({
  imports: [UserModule, ProductModule],
  controllers: [
    AdminCategoryController,
    AdminProductController,
    AdminUserController,
  ],
  providers: [
    AdminCategoryService,
    AdminProductService,
    AdminCategoryRepo,
    AdminProductRepo,
    AdminUserService,
    AdminUserRepo,
    JwtService,
    OrdersRepo,
  ],
})
export class AdminModule {}
