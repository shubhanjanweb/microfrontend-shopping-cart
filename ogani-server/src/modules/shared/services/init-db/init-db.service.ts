import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from 'src/modules/product/controllers/category/dto/category.dto';
import { CategoryListVo } from 'src/modules/product/controllers/category/vo/category.vo';
import { ProductDto } from 'src/modules/product/controllers/product/dto/product.dto';
import { CategoryEntity } from 'src/modules/product/entities/category.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { CategoryService } from 'src/modules/product/services/category.service';
import { ProductService } from 'src/modules/product/services/product.service';
import { Repository } from 'typeorm';

@Injectable()
export class InitDbService {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,

  ) { }

  onModuleInit() {
    this.initCategory();
    this.initProduct();
  }

  private async initCategory(): Promise<void> {
    const categoryList: CategoryDto[] = [
      {
        categoryName: 'category A',
        description: 'i am category A'
      },
      {
        categoryName: 'category B',
        description: 'i am category B'
      },
    ];
    const isExist = await this.categoryService.count();
    if (!isExist) {
      await this.categoryService.createCategoryFromList(categoryList);
    }
  }
  private async initProduct(): Promise<void> {
    const productList: ProductDto[] = [
      {
        productName: 'product A1',
        description: 'i am product A1',
        price: 12.50,
        discountPercentage: null,
        imageUrl: null,
        categoryId: 1
      },
      {
        productName: 'product A2',
        description: 'i am product A2',
        price: 12.50,
        discountPercentage: null,
        imageUrl: null,
        categoryId: 1
      },
      {
        productName: 'product B1',
        description: 'i am product B1',
        price: 12.50,
        discountPercentage: null,
        imageUrl: null,
        categoryId: 2
      },
      {
        productName: 'product B2',
        description: 'i am product B2',
        price: 12.50,
        discountPercentage: null,
        imageUrl: null,
        categoryId: 2
      }
    ];
    const isExist = await this.productService.count();
    if (!isExist) {
      await this.productService.createProductFromList(productList);
    }
  }
}
