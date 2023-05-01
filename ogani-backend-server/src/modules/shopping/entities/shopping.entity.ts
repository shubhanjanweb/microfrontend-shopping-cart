import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne } from 'typeorm';
import { SharedEntity } from 'src/modules/shared/entities/shared.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Entity({
  name: 'shopping'
})
export class ShoppingEntity extends SharedEntity {

  @Column({
    type: 'int',
    nullable: false,
    name: 'quantity',
    comment: 'quantity',
  })
  quantity: number;

  @Column({
    type: 'float',
    nullable: false,
    name: 'price',
    comment: 'price',
  })
  price: number;

  @OneToOne(() => ProductEntity)
  @JoinColumn()
  product: ProductEntity;

  @ManyToOne(() => CartEntity, cart => cart.shoppings)
  @JoinTable()
  cart: CartEntity;

  @ManyToOne(() => UserEntity, user => user.shoppings)
  @JoinTable()
  user: UserEntity;

}
