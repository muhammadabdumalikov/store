import { Module } from '@nestjs/common';
import { AdminProductService } from './service/product.service';
import { AdminCategoryController } from './controller/category.controller';
import { AdminProductController } from './controller/product.controller';
import { AdminCategoryService } from './service/category.service';
import { AdminCategoryRepo } from './repo/category.repo';
import { AdminProductRepo } from './repo/product.repo';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule],
  controllers: [AdminCategoryController, AdminProductController],
  providers: [
    AdminCategoryService,
    AdminProductService,
    AdminCategoryRepo,
    AdminProductRepo,
    JwtService,
  ],
})
export class AdminModule {}
