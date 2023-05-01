import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentOptionEntity } from './entities/payment-option.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentOptionEntity
    ]),
  ]
})
export class PaymentOptionModule { }
