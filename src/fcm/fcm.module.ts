import { Module } from '@nestjs/common';

import { TokensModule } from '../tokens/tokens.module';
import { FcmController } from './fcm.controller';
import { FcmService } from './provider';

@Module({
  imports: [
    TokensModule
  ],
  controllers: [
    FcmController
  ],
  providers: [
    FcmService,
  ],
  exports: [
    FcmService
  ],
})
export class FcmModule { }