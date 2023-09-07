import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './domain/category/category.module';
import { UserModule } from './domain/user/user.module';

@Module({
  imports: [CategoryModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
