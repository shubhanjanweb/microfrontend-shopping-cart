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
import { ShoppingService } from '../shopping.service';
import { ShoppingDto } from './dto/shopping.dto';
import { ShoppingVo } from './vo/shopping.vo';

@Controller('shopping')
export class ShoppingController {
  constructor(private readonly shoppingService: ShoppingService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addToCart(@Req() request, @Body() createShoppingDto: ShoppingDto): Promise<string> {
    return await this.shoppingService.addProductToShopping(request.user.userId, createShoppingDto);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async deleteFromCart(@Req() request, @Body() createShoppingDto: ShoppingDto): Promise<string> {
    return await this.shoppingService.deleteProductFromShopping(request.user.userId, createShoppingDto);
  }
}
