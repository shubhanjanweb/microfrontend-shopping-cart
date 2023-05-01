import { Column, Entity, JoinColumn, OneToOne, Unique } from 'typeorm';
import { SharedEntity } from 'src/modules/shared/entities/shared.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';

@Entity({
  name: 'stock'
})
export class StockEntity extends SharedEntity {

  @Column({
    type: 'int',
    nullable: true,
    default: 0,
    name: 'available_quantity',
    comment: 'available quantity',
  })
  availableQuantity: number;

  @Column({
    type: 'int',
    nullable: true,
    default: 0,
    name: 'demand_quantity',
    comment: 'demand quantity',
  })
  demandQuantity: number;

  @OneToOne(() => ProductEntity, product => product.stock)
  @JoinColumn()
  product: ProductEntity;
}
