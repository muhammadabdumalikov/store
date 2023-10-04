import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './domain/category/category.module';
import { UserModule } from './domain/user/user.module';
import { ProductModule } from './domain/product/product.module';
import { AdminModule } from './domain/admin/admin.module';
import { PoolService } from './providers/pool.service';

@Module({
  imports: [CategoryModule, UserModule, ProductModule, AdminModule],
  controllers: [AppController],
  providers: [AppService, PoolService],
})
export class AppModule {}
