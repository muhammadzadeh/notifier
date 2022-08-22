import { RabbitPayload, RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { Controller, Logger } from "@nestjs/common";
import { ReferalUserDto, VerifyMobileDto } from "./dto";
import { SmsService } from "./provider";

@Controller("sms")
export class SmsController {

    private logger = new Logger(SmsController.name);

    constructor(
        private readonly smsService: SmsService,
    ) { }


    @RabbitSubscribe(
        {
            exchange: 'notifier_exchange',
            routingKey: 'notifier.sms.otp.signin',
            queue: 'sms_signin_queue',
        }
    )
    public async sendSigninOTP(
        @RabbitPayload() msg: VerifyMobileDto,
    ) {
        this.logger.debug('signin');
        this.smsService.sendSigninOTP(msg).catch(e => {
            this.logger.error(e)
        });
    }

    @RabbitSubscribe(
        {
            exchange: 'notifier_exchange',
            routingKey: 'notifier.sms.otp.signup',
            queue: 'sms_signup_queue',
        }
    )
    public async sendSignupOTP(
        @RabbitPayload() msg: VerifyMobileDto,
    ) {
        this.logger.debug('signup');
        this.smsService.sendSignupOTP(msg).catch(e => {
            this.logger.error(e)
        });
    }

    @RabbitSubscribe(
        {
            exchange: 'notifier_exchange',
            routingKey: 'notifier.sms.referal',
            queue: 'sms_rereral_queue',
        }
    )
    public async sendReferalCode(
        @RabbitPayload() msg: ReferalUserDto,
    ) {
        this.logger.debug('referal');
        this.smsService.sendReferalCode(msg).catch(e => {
            this.logger.error(e)
        });
    }

}