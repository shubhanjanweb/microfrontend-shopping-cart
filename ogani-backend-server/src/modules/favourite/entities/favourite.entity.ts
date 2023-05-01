import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { SharedEntity } from 'src/modules/shared/entities/shared.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';

@Entity({
  name: 'favourite'
})
export class FavouriteEntity extends SharedEntity {

  @ManyToOne(() => UserEntity, user => user.favourites)
  @JoinTable()
  user: UserEntity;

  @OneToOne(() => ProductEntity)
  @JoinColumn()
  product: ProductEntity;
}
