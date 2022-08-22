import { Module } from '@nestjs/common';

import { SmsService } from './provider';
import { SmsController } from './sms.controller';

@Module({
  providers: [
    SmsService,
  ],
  controllers: [
    SmsController
  ],
  exports: [
    SmsService
  ],
})
export class SmsModule { }