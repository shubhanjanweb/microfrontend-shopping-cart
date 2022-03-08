import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { SharedEntity } from 'src/modules/shared/entities/shared.entity';
import { CategoryEntity } from './category.entity';

@Entity({
  name: 'product_details'
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
    name: 'full_name',
    comment: 'fullName',
  })
  price: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'description',
    comment: 'description',
  })
  description: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
    name: 'image_url',
    comment: 'image_url',
  })
  imageUrl: string;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'discount_percentage',
    comment: 'discount percentage',
  })
  discountPercentage: number;

  @ManyToOne(() => CategoryEntity, category => category.products)
  category: CategoryEntity;

}
