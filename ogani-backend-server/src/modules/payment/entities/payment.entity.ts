import { Column, Entity, JoinColumn, OneToMany, OneToOne, Unique } from 'typeorm';
import { SharedEntity } from 'src/modules/shared/entities/shared.entity';
import { CartEntity } from 'src/modules/cart/entities/cart.entity';

@Entity({
  name: 'payment'
})
export class PaymentEntity extends SharedEntity {

  @OneToOne(() => CartEntity, cart => cart.payment)
  @JoinColumn()
  cart: CartEntity;

}
