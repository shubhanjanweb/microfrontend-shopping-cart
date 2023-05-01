import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from '../cart/entities/cart.entity';
import { PaymentDto } from './controllers/dto/payment.dto';
import { PaymentEntity } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>
  ) { }
  //CRUD
  //Create
  async createPayment(createPaymentDto: PaymentDto): Promise<string> {
    const { cartId } = createPaymentDto;
    const cart: Promise<CartEntity> = this.cartRepository.findOneOrFail({
      where: { id: cartId },
      relations: ['payment']
    });
    const newPayment: PaymentEntity = this.paymentRepository.create();
    const payment: PaymentEntity | void = await this.paymentRepository.save(newPayment).catch(err => {
      throw new HttpException(`${err}`, HttpStatus.BAD_REQUEST);
    });
    (await cart).payment = payment;
    (await cart).save();
    return 'Successfully created';
  }
}
