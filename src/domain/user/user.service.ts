import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepo } from './user.repo';
import { UserRoles } from './enum/user.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) { }

  async create(params: CreateUserDto) {
    return this.userRepo.insert({
      phone: params.phone,
      first_name: params.first_name,
      last_name: params.last_name,
      role: UserRoles.SELLER,
    });
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
