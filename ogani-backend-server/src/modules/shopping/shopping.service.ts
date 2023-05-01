import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from '../cart/entities/cart.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { UserEntity } from '../user/entities/user.entity';
import { ShoppingDto } from './controllers/dto/shopping.dto';
import { ShoppingEntity } from './entities/shopping.entity';

@Injectable()
export class ShoppingService {
  constructor(
    @InjectRepository(ShoppingEntity)
    private readonly shoppingRepository: Repository<ShoppingEntity>,
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }
  //CRUD
  //Create
  async addProductToShopping(userId: number, shoppingDto: ShoppingDto): Promise<string> {
    const { cartId, productId, quantity } = shoppingDto;
    let shopping: any;
    let product: Promise<ProductEntity>;
    let cart: Promise<CartEntity>;
    let user: Promise<UserEntity>;

    if (cartId && productId && quantity) {
      shopping = await this.shoppingRepository
        .createQueryBuilder('shopping')
        .innerJoinAndSelect('shopping.product', 'product')
        .leftJoinAndSelect('shopping.cart', 'cart')
        .leftJoinAndSelect('cart.user', 'user')
        .where('user.id = :userId')
        .andWhere('product.id = :productId')
        .andWhere('cart.id = :cartId')
        .setParameters({ userId, cartId, productId })
        .getOne()
        .catch(err => {
          throw new HttpException(`${err}`, HttpStatus.BAD_REQUEST);
        });
      product = this.productRepository.findOneOrFail({
        where: { id: productId }
      }).catch(err => {
        throw new HttpException(`${err}`, HttpStatus.BAD_REQUEST);
      });
      cart = this.cartRepository.findOneOrFail({
        where: { id: cartId },
        relations: ['shoppings']
      }).catch(err => {
        throw new HttpException(`${err}`, HttpStatus.BAD_REQUEST);
      });
      user = this.userRepository.findOneOrFail({
        where: { id: userId },
        relations: ['shoppings']
      }).catch(err => {
        throw new HttpException(`${err}`, HttpStatus.BAD_REQUEST);
      });

      if (shopping) {
        shopping.quantity += quantity;
      } else {
        shopping = this.shoppingRepository.create();
        shopping.price = (await product).price * ((100 - (await product).discountPercentage) / 100);
        shopping.quantity = quantity;
        shopping.product = (await product);
        shopping.cart = (await cart);
        shopping.user = (await user);
      }
      shopping = this.shoppingRepository.save(shopping);
      (await user).shoppings = [...(await user).shoppings, (await shopping)];
      (await cart).shoppings = [...(await cart).shoppings, (await shopping)];
      await this.cartRepository.save((await cart));
      await this.userRepository.save((await user));
      return 'Successfully created';
    }
  }
  async deleteProductFromShopping(userId: number, shoppingDto: ShoppingDto): Promise<string> {
    const { cartId, productId, quantity } = shoppingDto;
    let shopping: ShoppingEntity;
    if (cartId && productId && quantity) {
      shopping = await this.shoppingRepository
        .createQueryBuilder('shopping')
        .innerJoinAndSelect('shopping.product', 'product')
        .leftJoinAndSelect('shopping.cart', 'cart')
        .leftJoinAndSelect('shopping.user', 'user')
        .where('user.id = :userId')
        .andWhere('product.id = :productId')
        .andWhere('cart.id = :cartId')
        .setParameters({ userId, cartId, productId: parseInt(productId.toString()) })
        .getOne()
        .catch(err => {
          throw new HttpException(`${err}`, HttpStatus.BAD_REQUEST);
        });
      if (shopping) {
        shopping.quantity -= quantity;
        const cart: Promise<CartEntity> = this.cartRepository.findOneOrFail({
          where: { id: cartId },
          relations: ['shoppings']
        }).catch(err => {
          throw new HttpException(`${err}`, HttpStatus.BAD_REQUEST);
        });

        if (shopping.quantity <= 0) {
          await this.shoppingRepository.remove(shopping);
        } else {
          await this.shoppingRepository.save(shopping);
        }
        await (await cart).save();
        return 'Updated successfully';
      } else {
        return 'Wrong operation';
      }
    }
  }


}
