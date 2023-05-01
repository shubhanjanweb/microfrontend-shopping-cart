import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from './entities/stock.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StockEntity
    ]),
  ]
})
export class StockDetailsModule { }
