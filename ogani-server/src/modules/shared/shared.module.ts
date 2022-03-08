import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { InitDbService } from './services/init-db/init-db.service';

@Module({
  imports: [ProductModule],
  providers: [InitDbService],
  exports: []
})
export class SharedModule { }
