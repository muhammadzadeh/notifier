import { RabbitPayload, RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { Controller, Logger } from "@nestjs/common";
import {
    FirstTemplateDto
} from "./dto";
import { EmailService } from "./provider";


@Controller("email")
export class EmailController {

    private logger = new Logger(EmailController.name);

    constructor(
        private readonly emailService: EmailService,
    ) { }


    @RabbitSubscribe(
        {
            exchange: 'notifier_exchange',
            routingKey: 'notifier.hello',
            queue: 'email_hello_queue',
        }
    )
    public async sendHello(
        @RabbitPayload() msg: FirstTemplateDto
    ) {
        this.emailService.sendHello(msg).catch(e => {
            this.logger.error(e)
        });
    }

}