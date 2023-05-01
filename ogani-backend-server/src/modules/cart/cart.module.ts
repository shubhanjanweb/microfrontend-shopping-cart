import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CartService } from './cart.service';
import { CartController } from './controllers/cart.controller';
import { CartEntity } from './entities/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartEntity,
      UserEntity
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule { }
