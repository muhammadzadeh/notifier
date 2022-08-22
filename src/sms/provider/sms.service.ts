import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import smsConfig from '../../config/sms.config';
import {
  ReferalUserDto,
  VerifyMobileDto,
} from '../dto';
import { kavehNegarTemplates } from '../kaveh-negar.templates';

const Kavenegar = require('kavenegar');

@Injectable()
export class SmsService {
  
  private KavenegarClinet

  constructor(
    @Inject(smsConfig.KEY)
    private readonly config: ConfigType<typeof smsConfig>,
  ) {
    this.KavenegarClinet = Kavenegar.KavenegarApi({
      apikey: config.apiToken
    });
  }

  async sendSignupOTP(verifyDto: VerifyMobileDto) {
    this.KavenegarClinet.VerifyLookup({
      receptor: verifyDto.receiver,
      token: verifyDto.otp,
      template: kavehNegarTemplates.verfiy
    }, function (response, status) {
      console.log(response);
      console.log(status);
    });
  }

  async sendSigninOTP(verifyDto: VerifyMobileDto) {
    this.KavenegarClinet.VerifyLookup({
      receptor: verifyDto.receiver,
      token: verifyDto.otp,
      template: kavehNegarTemplates.verfiy
    }, function (response, status) {
      console.log(response);
      console.log(status);
    });
  }

  async sendReferalCode(referalDto: ReferalUserDto) {
    this.KavenegarClinet.VerifyLookup({
      receptor: referalDto.receiver,
      token: referalDto.code,
      template: kavehNegarTemplates.referal
    }, function (response, status) {
      console.log(response);
      console.log(status);
    });
  }
}
