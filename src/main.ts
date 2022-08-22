import { NestFactory } from '@nestjs/core';
import { randomInt } from 'crypto';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
  );
  await app.listen(randomInt(4000, 5000));
  
}

bootstrap();
