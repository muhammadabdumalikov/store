import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepo } from './user.repo';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepo, AuthService, JwtService],
  exports: [UserService, UserRepo],

})
export class UserModule {}
