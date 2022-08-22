import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenEntity } from './entity/token.entity';
import {
  TokensRepository,
  TokensService,
} from './provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity])
  ],
  providers: [
    TokensRepository,
    TokensService,
  ],
  exports: [
    TokensService
  ],
})
export class TokensModule { }