import { CategoryDto } from './category.dto';
import { IsCurrency, IsEnum, IsInt, IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator';

export class UpdateCategoryDto {
  @MaxLength(50, { message: 'MaxLength 50' })
  @IsString({ message: 'not a string' })
  readonly categoryName: string;

  @MaxLength(100, { message: 'description must be less than equal to 100' })
  @IsString({ message: 'not a string' })
  @ValidateIf((o) => o.description != '')
  @IsOptional()
  readonly description?: string;

}