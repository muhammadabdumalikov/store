import { Injectable } from '@nestjs/common';
import { AdminUserRepo } from '../repo/user.repo';
import { SetUserStatusDto } from '../dto/user-admin.dto';
import { isEmpty } from 'lodash';
import { UserNotFoundException } from 'src/errors/permission.error';

@Injectable()
export class AdminUserService {
  constructor(private readonly adminUserRepo: AdminUserRepo) { }

  setStatus(params: SetUserStatusDto) {
    return this.adminUserRepo.updateById(params.user_id, {
      status: params.status,
    });
  }

  findAll() {
    return this.adminUserRepo.select({ is_deleted: false }, { limit: 10 });
  }

  async delete(id: string) {
    const user = await this.adminUserRepo.selectById(id);

    if (isEmpty(user)) {
      throw new UserNotFoundException();
    }

    await this.adminUserRepo.softDelete(id);

    return { success: true };
  }
}
