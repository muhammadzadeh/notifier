import { MailerService } from '@nestjs-modules/mailer';
import {
  Inject,
  Injectable,
  Logger
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import mailConfig from '../../config/mail.config';
import {
  FirstTemplateDto
} from '../dto';

@Injectable()
export class EmailService {
  private logger = new Logger('email-service')

  constructor(
    @Inject(mailConfig.KEY)
    private readonly config: ConfigType<typeof mailConfig>,
    private readonly mailerService: MailerService,
  ) { }

  async sendHello(dataDto: FirstTemplateDto) {
    this.mailerService
      .sendMail({
        to: dataDto.receiver,
        from: this.config.defaults.from,
        subject: 'Hi there!',
        template: 'first-template',
        context: dataDto,
      }).then((res) => {
        this.logger.debug(res);
      }).catch((error) => {
        this.logger.error(error);
      });
  }

}