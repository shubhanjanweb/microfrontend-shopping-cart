import { Column, Entity, Unique } from 'typeorm';
import { SharedEntity } from 'src/modules/shared/entities/shared.entity';

@Entity({
  name: 'payment_option'
})
export class PaymentOptionEntity extends SharedEntity {


}
