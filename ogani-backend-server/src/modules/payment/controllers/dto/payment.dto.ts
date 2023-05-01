import { MaxLength, IsOptional, ValidateIf, IsString, IsInt, IsCurrency } from 'class-validator';
import { Type } from 'class-transformer';

export class PaymentDto {

  cartId?: number;

}
