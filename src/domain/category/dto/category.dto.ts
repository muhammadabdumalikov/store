import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GetChildCategoriesDto {
  @ApiProperty()
  @IsString()
  category_id: string;
}