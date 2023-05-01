import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, Unique } from 'typeorm';
import { SharedEntity } from 'src/modules/shared/entities/shared.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { PaymentEntity } from 'src/modules/payment/entities/payment.entity';
import { ShoppingEntity } from 'src/modules/shopping/entities/shopping.entity';

@Entity({
  name: 'cart'
})
export class CartEntity extends SharedEntity {

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'status',
    default: 'NEW',
    comment: 'status NEW, READY_FOR_PAYMENT, PAYMENT_DONE, CLOSED',
  })
  status: string;

  @ManyToOne(() => UserEntity, user => user.carts)
  @JoinTable()
  user: UserEntity;

  @OneToOne(() => PaymentEntity, payment => payment.cart)
  @JoinColumn()
  payment: PaymentEntity;

  @OneToMany(() => ShoppingEntity, shopping => shopping.cart)
  @JoinColumn()
  shoppings: ShoppingEntity[];

}
