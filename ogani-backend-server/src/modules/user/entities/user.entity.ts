import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, Unique } from 'typeorm';
import { SharedEntity } from 'src/modules/shared/entities/shared.entity';
import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { FavouriteEntity } from 'src/modules/favourite/entities/favourite.entity';
import { ShoppingEntity } from 'src/modules/shopping/entities/shopping.entity';

@Entity({
  name: 'user'
})
export class UserEntity extends SharedEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'user_name',
    comment: 'user name',
    unique: true
  })
  userName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'email_id',
    comment: 'emailId',
    unique: true
  })
  emailId: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'password',
    comment: 'password',
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 200,
    name: 'full_name',
    comment: 'fullName',
  })
  fullName: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
    name: 'mobile_number',
    comment: 'mobileNumber',
  })
  mobileNumber: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 10,
    name: 'type',
    comment: 'type',
  })
  type: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
    name: 'photo_url',
    comment: 'photoUrl',
  })
  photoUrl: string;

  @OneToMany(() => CartEntity, cart => cart.user)
  @JoinColumn()
  carts: CartEntity[];

  @OneToMany(() => FavouriteEntity, fav => fav.user)
  @JoinColumn()
  favourites: FavouriteEntity[];

  @OneToMany(() => ShoppingEntity, shop => shop.user)
  @JoinColumn()
  shoppings: ShoppingEntity[];

}
