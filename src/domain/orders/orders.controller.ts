import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, OrderListDto } from './dto/order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IUser } from '../user/interface/user.interface';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() params: CreateOrderDto) {
    return this.ordersService.createOrder(params);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization')
  @Get('list')
  async orderList(
    @Body() params: OrderListDto,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.ordersService.orderList(params, currentUser);
  }
}
