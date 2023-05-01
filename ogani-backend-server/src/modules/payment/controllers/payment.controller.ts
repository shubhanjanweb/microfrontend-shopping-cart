import {
  Controller,
  UseGuards,
  Post,
  HttpStatus,
  Body,
  HttpCode,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Get,
  Query
} from '@nestjs/common';
import { PaymentService } from '../payment.service';
import { PaymentDto } from './dto/payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly cartService: PaymentService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCart(@Body() createPayment: PaymentDto): Promise<string> {
    return await this.cartService.createPayment(createPayment);
  }
}
