import { Injectable } from '@nestjs/common';
import { AdminUserRepo } from '../repo/user.repo';
import { SetUserStatusDto } from '../dto/user-admin.dto';
import { isEmpty } from 'lodash';
import { UserNotFoundException } from 'src/errors/permission.error';
import { ListPageDto } from 'src/shared/dto/list.dto';

@Injectable()
export class AdminUserService {
  constructor(private readonly adminUserRepo: AdminUserRepo) {}

  setStatus(params: SetUserStatusDto) {
    return this.adminUserRepo.updateById(params.user_id, {
      status: params.status,
    });
  }

  findAll(params: ListPageDto) {
    return this.adminUserRepo.select(
      {
        is_deleted: false,
      },
      {
        limit: params.limit,
        offset: params.offset,
        order_by: { column: 'created_at', order: 'desc', use: true },
      },
    );
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
