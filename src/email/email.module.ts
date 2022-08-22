import {
  MailerModule,
  MailerOptions
} from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import mailConfig from '../config/mail.config';
import { EmailController } from './email.contoller';
import { EmailService } from './provider/email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (config: ConfigType<typeof mailConfig>) => {
        return config as MailerOptions
      },
      inject: [mailConfig.KEY]
    }),
  ],
  controllers: [
    EmailController,
  ],
  providers: [
    EmailService,
  ],
  exports: [
    EmailService
  ],
})
export class EmailModule { }