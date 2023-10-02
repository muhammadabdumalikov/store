import { Injectable } from '@nestjs/common';
import { SetProductStatusDto } from '../dto/product-admin.dto';
import { AdminProductRepo } from '../repo/product.repo';
import { isEmpty } from 'lodash';
import { ProductNotFoundException } from 'src/errors/permission.error';

@Injectable()
export class AdminProductService {
  constructor(private readonly adminProductRepo: AdminProductRepo) {}

  setStatus(params: SetProductStatusDto) {
    return this.adminProductRepo.updateById(params.product_id, {
      status: params.status,
    });
  }

  findAll() {
    return this.adminProductRepo.select({ is_deleted: false }, { limit: 10 });
  }

  async delete(id: string) {
    const product = await this.adminProductRepo.selectById(id);

    if (isEmpty(product)) {
      throw new ProductNotFoundException();
    }

    await this.adminProductRepo.softDelete(id);

    return { success: true };
  }
}
