import { Injectable } from '@nestjs/common';
import { AdminUserRepo } from '../repo/user.repo';
import { SetUserStatusDto } from '../dto/user-admin.dto';

@Injectable()
export class AdminUserService {
  constructor(private readonly adminProductRepo: AdminUserRepo) { }

  setStatus(params: SetUserStatusDto) {
    return this.adminProductRepo.updateById(params.user_id, {
      status: params.status,
    });
  }

  findAll() {
    return this.adminProductRepo.select({ is_deleted: false }, { limit: 10 });
  }
}
