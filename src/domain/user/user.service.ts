import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserRepo } from './user.repo';
import { UserRoles, UserStatus } from './enum/user.enum';
import { IUser } from './interface/user.interface';
import { EmailConfirmationService } from './email-confirmaton.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly emailService: EmailConfirmationService,
  ) {}

  async signUp(params: CreateUserDto) {
    const user: IUser = await this.userRepo.selectByPhone(params.phone);

    if (user) {
      return { code: 110 };
    }
    
    const otp = Math.floor(10000 + Math.random() * 90000);

    const [user]: [IUser] = await this.userRepo.insert({
      phone: params.phone,
      first_name: params.first_name,
      last_name: params.last_name,
      role: UserRoles.SELLER,
      otp: otp,
      status: UserStatus.REGISTERED,
    });

    await this.emailService.sendVerificationLink(params.email, otp);

    return { otp: user.otp, phone: user.phone };
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    return this.userRepo.selectById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
