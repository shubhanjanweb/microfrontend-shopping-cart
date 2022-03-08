import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartEntity
    ]),
  ]
})
export class CartModule { }
