import { BeforeInsert, Column, Entity, Unique } from 'typeorm';
import { SharedEntity } from 'src/modules/shared/entities/shared.entity';

@Entity({
  name: 'user_details'
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
}
