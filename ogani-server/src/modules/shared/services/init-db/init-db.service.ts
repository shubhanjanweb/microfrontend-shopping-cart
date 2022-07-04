import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from 'src/modules/product/controllers/category/dto/category.dto';
import { CategoryListVo } from 'src/modules/product/controllers/category/vo/category.vo';
import { ProductDto } from 'src/modules/product/controllers/product/dto/product.dto';
import { CategoryEntity } from 'src/modules/product/entities/category.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { CategoryService } from 'src/modules/product/services/category.service';
import { ProductService } from 'src/modules/product/services/product.service';
import { UserDto } from 'src/modules/user/controllers/dto/user.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class InitDbService {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private userService: UserService
  ) { }

  onModuleInit() {
    this.initCategory();
    this.initProduct();
    this.initUser();
  }

  private async initUser(): Promise<void> {
    const user: UserDto = {
      emailId: 'admin@ogani.com',
      fullName: 'Admin At Ogani',
      mobileNumber: '1234567890',
      password: 'password',
      photoUrl: 'https://i.pravatar.cc/300',
      type: 'admin',
      userName: 'admin'
    }
    const isExist = await this.userService.count();
    if (!isExist) {
      await this.userService.createUser(user);
    }
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
