import { Module } from '@nestjs/common';

import { ConsumerService } from './service';

@Module({
  imports: [
  ],
  providers: [
    ConsumerService,
  ],
  exports: [
    ConsumerService
  ]
})
export class ConsumerModule { }