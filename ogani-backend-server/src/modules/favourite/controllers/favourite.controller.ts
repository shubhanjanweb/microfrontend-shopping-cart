import {
  Controller,
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
import { ProductVo } from 'src/modules/product/controllers/product/vo/product.vo';
import { FavouriteService } from '../favourite.service';
import { FavouriteDto } from './dto/favourite.dto';


@Controller('favourite')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) { }

  @Get('add/:id')
  @HttpCode(HttpStatus.CREATED)
  async addToList(
    @Req() request,
    @Param('id', new ParseIntPipe()) productId: number
  ): Promise<string> {
    return await this.favouriteService.addProductInFavouriteList({
      userId: request.user.userId,
      productId: productId
    });
  }


  @Get('product')
  async getFavouriteProducts(
    @Req() request
  ): Promise<ProductVo[]> {
    return await (await this.favouriteService.getListOfFavouriteProducts(request.user.userId)).map(fav => fav.product);
  }

  @Get('productids')
  async getFavouriteProductsIds(
    @Req() request
  ): Promise<number[]> {
    return await (await this.favouriteService.getListOfFavouriteProducts(request.user.userId)).map(fav => fav.product.id);
  }

  @Delete('remove/:id')
  async removeFromList(
    @Req() request,
    @Param('id', new ParseIntPipe()) productId: number
  ): Promise<string> {
    return await this.favouriteService.removeFromFavouriteList({
      userId: request.user.userId,
      productId: productId
    });
  }
}
