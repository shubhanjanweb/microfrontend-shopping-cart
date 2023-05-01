import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, Unique } from 'typeorm';
import { SharedEntity } from 'src/modules/shared/entities/shared.entity';
import { CategoryEntity } from './category.entity';
import { StockEntity } from 'src/modules/stock-details/entities/stock.entity';
import { ShoppingEntity } from 'src/modules/shopping/entities/shopping.entity';
import { FavouriteEntity } from 'src/modules/favourite/entities/favourite.entity';

@Entity({
  name: 'product'
})
export class ProductEntity extends SharedEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'product_name',
    comment: 'product name',
  })
  productName: string;

  @Column({
    type: 'float',
    nullable: false,
    name: 'price',
    comment: 'price',
  })
  price: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 5000,
    name: 'description',
    comment: 'description',
  })
  description: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 500,
    name: 'image_url',
    comment: 'image_url',
  })
  imageUrl: string;

  @Column({
    type: 'int',
    nullable: true,
    name: 'discount_percentage',
    comment: 'discount percentage',
  })
  discountPercentage: number;

  @ManyToOne(() => CategoryEntity, category => category.products)
  @JoinTable()
  category: CategoryEntity;

  @OneToOne(() => StockEntity, stock => stock.product)
  @JoinColumn()
  stock: StockEntity;

}
