import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { SharedEntity } from 'src/modules/shared/entities/shared.entity';
import { ProductEntity } from './product.entity';

@Entity({
  name: 'category_details'
})
export class CategoryEntity extends SharedEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'category_name',
    comment: 'category name',
  })
  categoryName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'description',
    comment: 'description',
  })
  description: string;

  @OneToMany(() => ProductEntity, product => product.category)
  products: ProductEntity[];
}
