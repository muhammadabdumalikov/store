import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepo } from './user.repo';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { EmailConfirmationService } from './email-confirmaton.service';
import EmailService from 'src/providers/email.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepo,
    AuthService,
    JwtService,
    EmailConfirmationService,
    EmailService,
  ],
  exports: [UserService, UserRepo],
})
export class UserModule {}
