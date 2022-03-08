import { Column, Entity, Unique } from 'typeorm';
import { SharedEntity } from 'src/modules/shared/entities/shared.entity';

@Entity({
  name: 'cart_details'
})
export class CartEntity extends SharedEntity {

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'user_id',
    comment: 'userId',
  })
  userId: string;
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'product_id',
    comment: 'productId',
  })
  productId: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'purchase_quantity',
    comment: 'purchase quantity',
  })
  purchaseQuantity: string;
}
