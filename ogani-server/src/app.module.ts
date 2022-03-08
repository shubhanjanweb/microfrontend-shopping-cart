import { AuthModule } from './modules/auth/auth.module';
import * as path from 'path';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { SharedModule } from './modules/shared/shared.module';
import { StockDetailsModule } from './modules/stock-details/stock-details.module';
import { PaymentOptionModule } from './modules/payment-option/payment-option.module';
import { CartModule } from './modules/cart/cart.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';

@Module({
  imports: [
    AuthModule,
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
      modifyConfigName: (name: string) => name.replace('.config', ''),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: config.get('database.type'),
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        logging: config.get('database.logging'),
        synchronize: config.get('database.syncronize'),
        timezone: '+05:30',
        cache: {
          duration: 60000,
        },
        extra: {
          poolMax: 32,
          poolMin: 16,
          queueTimeout: 60000,
          pollPingInterval: 60,
          pollTimeout: 60,
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ProductModule,
    StockDetailsModule,
    PaymentOptionModule,
    CartModule,
    SharedModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  exports: []
})
export class AppModule { }
