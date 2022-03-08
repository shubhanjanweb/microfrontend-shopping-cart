import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const PREFIX = process.env.PREFIX || '/';
export const IS_DEV = process.env.NODE_ENV !== 'production';
export const JWT_SECRET = process.env.JWT_SECRET;
export const EXPIRES_IN = process.env.EXPIRES_IN;

async function bootstrap() {
  const logger: Logger = new Logger('main.ts');
  const app = await NestFactory.create(AppModule, {
    logger: IS_DEV ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn'],
  });
  app.enableCors();
  //app.use(csurf());
  app.setGlobalPrefix(PREFIX);
  await app.listen(PORT, () => {
    logger.log(`Server started at :http://wwww.localhost:${PORT}/${PREFIX}`);
  });
}
bootstrap();
