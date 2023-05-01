import { CartDto } from './cart.dto';
import { IsCurrency, IsEnum, IsInt, IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator';
import { ShoppingDto } from 'src/modules/shopping/controllers/dto/shopping.dto';

export class UpdateCartDto extends CartDto {
  status?: string;
  totalPrice?: number;
  shoppings?: ShoppingDto[];
}