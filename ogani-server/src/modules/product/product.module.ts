import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './controllers/category/category.controller';
import { ProductController } from './controllers/product/product.controller';
import { CategoryEntity } from './entities/category.entity';
import { ProductEntity } from './entities/product.entity';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'product-details',
        module: ProductModule,
      },
    ]),
    TypeOrmModule.forFeature([
      CategoryEntity,
      ProductEntity
    ]),
  ],
  controllers: [ProductController, CategoryController],
  providers: [ProductService, CategoryService],
  exports: [ProductService, CategoryService]
})
export class ProductModule { }
