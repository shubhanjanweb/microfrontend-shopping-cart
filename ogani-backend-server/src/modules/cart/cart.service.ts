import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEnum } from 'src/modules/shared/enums';
import { Repository, getConnection } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CartDto } from './controllers/dto/cart.dto';
import { UpdateCartDto } from './controllers/dto/update.cart.dto';
import { CartVo } from './controllers/vo/cart.vo';
import { CartEntity } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>

  ) { }
  //CRUD
  //Create
  async getCart(userId: number): Promise<CartVo> {
    let cart: any;
    if (userId) {
      cart = await this.cartRepository
        .createQueryBuilder('cart')
        .leftJoinAndSelect('cart.shoppings', 'shopping')
        .leftJoinAndSelect('cart.user', 'user')
        .leftJoinAndSelect('shopping.product', 'product')
        .leftJoinAndSelect('product.category', 'category')
        .where('user.id = :userId')
        .andWhere('cart.status = "NEW"')
        .setParameter('userId', userId)
        .getOne()
        .catch(err => {
          throw new HttpException(`1 ${err}`, HttpStatus.BAD_REQUEST);
        });
      if (cart) {
        let { id, status, shoppings } = cart;
        shoppings = shoppings.map(shop => {
          let { id, imageUrl, productName, category } = shop.product;
          let { categoryName } = category;
          return { id, imageUrl, productName, categoryName, price: shop.price, quantity: shop.quantity };
        });
        return { id, status, shoppings };
      } else {
        const user: Promise<UserEntity> = this.userRepository.findOneOrFail({
          where: { id: userId },
          relations: ['carts']
        });
        cart = this.cartRepository.create();
        cart.user = (await user);
        cart.shoppings = [];
        cart = this.cartRepository.save(cart);
        (await user).carts = [...(await user).carts, (await cart)];
        //cart.save();
        await (await user).save();
        const { id, status, shoppings } = (await cart);
        return { id, status, shoppings };
      }
    }
  }

  //Update
  async modifyCartById(id: number, updateCartDto: UpdateCartDto): Promise<string> {
    const {
      raw: { affectedRows },
    } = await this.cartRepository.update(id, updateCartDto);
    if (affectedRows) {
      return 'Cart updated successfully';
    } else {
      return 'Cart updatation failed';
    }
  }
}
