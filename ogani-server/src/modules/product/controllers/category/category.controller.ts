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
} from '@nestjs/common';
import { CategoryService } from '../../services/category.service';
import { CategoryDto } from './dto/category.dto';
import { CategoryReqDto } from './dto/category.req.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';
import { CategoryListVo, CategoryVo } from './vo/category.vo';

@Controller('category')
export class CategoryController {
  constructor(
    private categoryService: CategoryService
  ) { }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() createCategoryDto: CategoryDto): Promise<string> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async destroyCategoryById(@Param('id', new ParseIntPipe()) id: number): Promise<string> {
    return await this.categoryService.destroyCategoryById(id);
  }

  @Patch(':id')
  async modifyCategoryById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<string> {
    return await this.categoryService.modifyCategoryById(id, updateCategoryDto);
  }


  @HttpCode(HttpStatus.OK)
  @Get()
  async CategoryList(): Promise<CategoryVo[]> {
    return await this.categoryService.categoryList();
  }

  @Get('page')
  async CategoryListPage(@Query() CategoryReqDto: CategoryReqDto): Promise<CategoryListVo> {
    return await this.categoryService.categoryListPage(CategoryReqDto);
  }

}
