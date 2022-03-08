import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStartegy } from './local.strategy';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import * as dotenv from "dotenv";
dotenv.config();

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.EXPIRES_IN },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalAuthGuard, LocalStartegy, JwtStrategy],
    exports: [AuthService, LocalAuthGuard, LocalStartegy, JwtStrategy],
})
export class AuthModule {
}
