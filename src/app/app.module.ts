import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigType,
} from '@nestjs/config';
import {
  TypeOrmModule,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';

import fcmConfig from '../config/fcm.config';
import mailConfig from '../config/mail.config';
import rabitmqConfig from '../config/rabitmq.config';
import smsConfig from '../config/sms.config';
import typeormConfig from '../config/typeorm.config';
import { ConsumerModule } from '../consumer/consumer.module';
import { EmailModule } from '../email/email.module';
import { FcmModule } from '../fcm/fcm.module';
import { SmsModule } from '../sms/sms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        fcmConfig,
        mailConfig,
        rabitmqConfig,
        smsConfig,
        typeormConfig,
      ]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigType<typeof typeormConfig>) => {
        return config as TypeOrmModuleAsyncOptions
      },
      inject: [typeormConfig.KEY]
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: (config: ConfigType<typeof rabitmqConfig>) => {
        return config
      },
      inject: [rabitmqConfig.KEY]
    }),
    ConsumerModule,
    SmsModule,
    EmailModule,
    FcmModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
