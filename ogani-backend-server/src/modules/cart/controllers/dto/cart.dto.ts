import { MaxLength, IsOptional, ValidateIf, IsString, IsInt, IsCurrency } from 'class-validator';
import { Type } from 'class-transformer';
import { DefaultValuePipe } from '@nestjs/common';
import { ShoppingDto } from 'src/modules/shopping/controllers/dto/shopping.dto';

export class CartDto {

  @IsInt({ message: 'userId must be in number' })
  readonly userId: number;
  readonly status?: string;
  readonly totalPrice?: number;
  readonly paymentId?: number;
  readonly shoppings?: ShoppingDto[];

}
