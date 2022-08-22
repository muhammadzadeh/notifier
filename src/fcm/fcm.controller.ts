import { RabbitPayload, RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { Controller, Logger } from "@nestjs/common";
import { CreateTokenDto } from "../tokens/dto/create-tokens.dto";
import { TokensService } from "../tokens/provider";
import { PushRequestDto } from "./dto";
import { FcmService } from "./provider";


@Controller("fcm")
export class FcmController {

    private logger = new Logger(FcmController.name);

    constructor(
        private readonly fcmService: FcmService,
        private readonly tokenService: TokensService,
    ) { }


    @RabbitSubscribe(
        {
            exchange: 'notifier_exchange',
            routingKey: 'notifier.fcm.register_token',
            queue: 'fcm_register_queue',
        }
    )
    public async registerFCMToken(
        @RabbitPayload() msg: CreateTokenDto,
    ) {
        this.tokenService.createOne(msg).catch(e => {
            this.logger.error(e)
        });
    }

    @RabbitSubscribe(
        {
            exchange: 'notifier_exchange',
            routingKey: 'notifier.fcm.send_push',
            queue: 'fcm_push_queue',
        }
    )
    public async sendPushNotification(
        @RabbitPayload() msg: PushRequestDto,
    ) {
        this.fcmService.sendPush(msg).catch(e => {
            this.logger.error(e)
        });
    }
}