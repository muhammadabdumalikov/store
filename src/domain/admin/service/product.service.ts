import { Injectable } from '@nestjs/common';
import { SetProductStatusDto } from '../dto/product-admin.dto';
import { AdminProductRepo } from '../repo/product.repo';

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
}
