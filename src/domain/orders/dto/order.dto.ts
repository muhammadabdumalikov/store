import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  product_id: string;

  @ApiProperty()
  @IsNumber()
  count: number;

  @ApiProperty()
  @IsString()
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
