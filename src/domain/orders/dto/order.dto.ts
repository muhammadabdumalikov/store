import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, MaxLength } from 'class-validator';
import { OrderStatus } from './order.enum';
import { ListPageDto } from 'src/shared/dto/list.dto';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  product_id: string;

  @ApiProperty()
  @IsNumber()
  count: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  client_first_name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  client_last_name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(12)
  client_phone: string;
}

export class OrderListDto extends ListPageDto {
  @ApiProperty()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
