import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ProductModule, UserModule],
  exports: []
})
export class SharedModule { }
