import { MaxLength, IsOptional, ValidateIf, IsString, IsInt, IsCurrency, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ShoppingDto {
  @IsInt({ message: 'cartId must be in number' })
  readonly cartId: number;
  @IsInt({ message: 'productId must be in number' })
  readonly productId: number;
  readonly quantity: number;
}
