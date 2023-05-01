import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVo } from '../product/controllers/product/vo/product.vo';
import { ProductEntity } from '../product/entities/product.entity';
import { UserEntity } from '../user/entities/user.entity';
import { FavouriteDto } from './controllers/dto/favourite.dto';
import { FavouriteVo } from './controllers/vo/favourite.vo';
import { FavouriteEntity } from './entities/favourite.entity';

@Injectable()
export class FavouriteService {
  constructor(
    @InjectRepository(FavouriteEntity)
    private readonly favouriteRepository: Repository<FavouriteEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) { }
  //CRUD
  //Create
  async addProductInFavouriteList(favouriteDto: FavouriteDto): Promise<string> {
    const { userId, productId } = favouriteDto;
    if (userId && productId) {
      const result: Pick<FavouriteEntity, 'id'> | undefined =
        await this.favouriteRepository
          .createQueryBuilder('favourite')
          .innerJoinAndSelect('favourite.user', 'user')
          .leftJoinAndSelect('favourite.product', 'product')
          .where('user.id = :userId')
          .andWhere('product.id = :productId')
          .setParameters({ userId, productId })
          .getOne()
          .catch(err => {
            throw new HttpException(`1 ${err}`, HttpStatus.BAD_REQUEST);
          });
      if (result) {
        throw new HttpException(`product already exists in favourite list`, HttpStatus.OK);
      }
    }
    let favourite: any = this.favouriteRepository.create();
    const user: Promise<UserEntity> = this.userRepository.findOneOrFail({
      where: { id: userId },
      relations: ['favourites']
    }).catch(err => {
      throw new HttpException(`2 ${err}`, HttpStatus.BAD_REQUEST);
    });
    const product: Promise<ProductEntity> = this.productRepository.findOneOrFail({
      where: { id: productId }
    }).catch(err => {
      throw new HttpException(`3 ${err}`, HttpStatus.BAD_REQUEST);
    });
    favourite.user = (await user);
    favourite.product = (await product);
    favourite = this.favouriteRepository.save(favourite);
    (await user).favourites = [...(await user).favourites, (await favourite)];
    await this.userRepository.save((await user));
    return 'Successfully created';
  }
  //Update
  async removeFromFavouriteList(favouriteDto: FavouriteDto): Promise<string> {
    const { userId, productId } = favouriteDto;

    if (userId && productId) {
      let favourite: FavouriteEntity | undefined = await this.favouriteRepository
        .createQueryBuilder('favourite')
        .innerJoinAndSelect('favourite.user', 'user')
        .leftJoinAndSelect('favourite.product', 'product')
        .where('user.id = :userId')
        .andWhere('product.id = :productId')
        .setParameters({ userId, productId })
        .getOne()
        .catch(err => {
          throw new HttpException(`4 ${err}`, HttpStatus.BAD_REQUEST);
        });
      if (favourite) {
        await this.favouriteRepository.remove((await favourite)).catch(err => {
          throw new HttpException(`5 ${err}`, HttpStatus.BAD_REQUEST);
        });
        return 'Product has been removed successfully from favourite list';
      }
      return 'Favourite updatation failed';
    }
  }

  async getListOfFavouriteProducts(userId: number): Promise<FavouriteVo[]> {
    return await this.favouriteRepository
      .createQueryBuilder('favourite')
      .innerJoinAndSelect('favourite.user', 'user')
      .leftJoinAndSelect('favourite.product', 'product')
      .leftJoinAndSelect('product.category', 'category')
      .where('user.id = :userId')
      .andWhere('favourite.productId = product.id')
      .setParameters({ userId })
      .getMany()
      .catch(err => {
        throw new HttpException(`6 ${err}`, HttpStatus.BAD_REQUEST);
      });
  }
}
