import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  name_uz: string;

  @ApiProperty()
  @IsString()
  name_lat: string;

  @ApiProperty()
  @IsString()
  name_ru: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image_url?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  parent_id?: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }
