import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { InitDbService } from './services/init-db/init-db.service';

@Module({
  imports: [ProductModule, UserModule],
  providers: [InitDbService],
  exports: []
})
export class SharedModule { }
