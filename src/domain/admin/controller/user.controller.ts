import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guard/admin.guard';
import { AdminUserService } from '../service/user.service';
import { UserService } from 'src/domain/user/user.service';
import { SetUserStatusDto } from '../dto/user-admin.dto';

@ApiTags('Admin')
@ApiBearerAuth('authorization')
@UseGuards(AdminGuard)
@Controller('admin/users')
export class AdminUserController {
  constructor(
    private readonly adminUserService: AdminUserService,
    private readonly userService: UserService,
  ) { }

  @Post('set-status')
  async setStatus(@Body() params: SetUserStatusDto) {
    return this.adminUserService.setStatus(params);
  }

  @Get('list')
  async list() {
    return this.adminUserService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
