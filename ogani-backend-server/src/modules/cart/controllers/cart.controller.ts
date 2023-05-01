import {
  Controller,
  UseGuards,
  Post,
  HttpStatus,
  Body,
  HttpCode,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Get,
  Query,
  Req
} from '@nestjs/common';
import { CartService } from '../cart.service';
import { CartDto } from './dto/cart.dto';
import { UpdateCartDto } from './dto/update.cart.dto';
import { CartVo } from './vo/cart.vo';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Get()
  async createCart(@Req() request): Promise<CartVo> {
    return await this.cartService.getCart(request.user.userId);
  }

  @Patch(':id')
  async modifyCartById(
    @Param('id', new ParseIntPipe()) cartId: number,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<string> {
    return await this.cartService.modifyCartById(cartId, updateCartDto);
  }

}
