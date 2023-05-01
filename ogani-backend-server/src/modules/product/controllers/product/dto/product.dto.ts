import { MaxLength, IsOptional, ValidateIf, IsString, IsInt, IsCurrency } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDto {
  @MaxLength(50, { message: 'MaxLength 50' })
  @IsString({ message: 'not a string' })
  readonly productName: string;

  @IsCurrency({ message: 'price not a valid currency' })
  readonly price: number;

  @IsString({ message: 'not a string' })
  @ValidateIf((o) => o.imageUrl != '')
  @IsOptional()
  readonly imageUrl?: string;

  @MaxLength(100, { message: 'description must be less than equal to 100' })
  @IsString({ message: 'not a string' })
  @ValidateIf((o) => o.description != '')
  @IsOptional()
  readonly description?: string;

  @IsInt({ message: 'discount must be in number' })
  readonly categoryId: number;

  @IsInt({ message: 'discount must be in number' })
  readonly discountPercentage: number;

}
