import { MaxLength, IsOptional, ValidateIf, IsString, IsInt, IsCurrency } from 'class-validator';
import { Type } from 'class-transformer';

export class CategoryDto {
  @MaxLength(50, { message: 'MaxLength 50' })
  @IsString({ message: 'not a string' })
  readonly categoryName: string;

  @IsString({ message: 'not a string' })
  readonly description: string;

}
