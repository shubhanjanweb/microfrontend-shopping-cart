import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from '../cart/entities/cart.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { UserEntity } from '../user/entities/user.entity';
import { ShoppingController } from './controllers/shopping.controller';
import { ShoppingEntity } from './entities/shopping.entity';
import { ShoppingService } from './shopping.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShoppingEntity,
      CartEntity,
      ProductEntity,
      UserEntity
    ]),
  ],
  controllers: [ShoppingController],
  providers: [ShoppingService],
  exports: [ShoppingService]
})
export class ShoppingModule { }
