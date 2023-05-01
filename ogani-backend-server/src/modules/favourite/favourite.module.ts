import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../product/entities/product.entity';
import { UserEntity } from '../user/entities/user.entity';
import { FavouriteController } from './controllers/favourite.controller';
import { FavouriteEntity } from './entities/favourite.entity';
import { FavouriteService } from './favourite.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavouriteEntity,
      UserEntity,
      ProductEntity
    ]),
  ],
  controllers: [FavouriteController],
  providers: [FavouriteService],
  exports: [FavouriteService]
})
export class FavouriteModule { }
