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
import { ProductService } from '../../services/product.service';
import { ProductDto } from './dto/product.dto';
import { ProductReqDto } from './dto/product.req.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { ProductListVo, ProductVo } from './vo/product.vo';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() createProductDto: ProductDto): Promise<string> {
    return await this.productService.createProduct(createProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async destroyProductById(@Param('id', new ParseIntPipe()) id: number): Promise<string> {
    return await this.productService.destroyProductById(id);
  }

  @Patch(':id')
  async modifyProductById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<string> {
    return await this.productService.modifyProductById(id, updateProductDto);
  }


  @HttpCode(HttpStatus.OK)
  @Get()
  async ProductList(@Req() request): Promise<ProductVo[]> {
    return await this.productService.productList(request);
  }

  @Get(':id')
  async Product(@Param('id', new ParseIntPipe()) id: number): Promise<ProductVo> {
    return await this.productService.getProductById(id);
  }

  @Get('page')
  async ProductListPage(@Query() ProductReqDto: ProductReqDto): Promise<ProductListVo> {
    return await this.productService.productListPage(ProductReqDto);
  }
}
