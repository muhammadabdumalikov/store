import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guard/admin.guard';
import { AdminAdvertisementService } from '../service/ads.service';
import { CreateAdsDto } from '../dto/ads.dto';

@ApiTags('Admin')
@ApiBearerAuth('authorization')
@UseGuards(AdminGuard)
@Controller('admin/ads')
export class AdminAdvertisementController {
  constructor(private readonly adminUserService: AdminAdvertisementService) {}

  @Post('create')
  async setStatus(@Body() params: CreateAdsDto) {
    return this.adminUserService.create(params);
  }
}
