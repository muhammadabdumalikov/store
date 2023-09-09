import { Injectable } from '@nestjs/common';
import { ConfirmOtpDto, UserLoginDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepo } from './user.repo';
import { IncorrectOtpException, UserNotFoundException } from 'src/errors/permission.error';
import { IUser } from './interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepo,
  ) {}

  async confirmOtp(params: ConfirmOtpDto) {
    const user: IUser = await this.userRepo.selectByPhone(params.phone);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (user.otp !== params.otp) {
      throw new IncorrectOtpException();
    }

    return this.jwtService.signAsync(
      { id: user.id },
      { privateKey: 'store-app' },
    );
  }

  async login(params: UserLoginDto) {
    const user: IUser = await this.userRepo.selectByPhone(params.phone);

    if (!user) {
      throw new UserNotFoundException();
    }

    return this.jwtService.signAsync(
      { id: user.id },
      { privateKey: 'store-app' },
    );
  }
}
