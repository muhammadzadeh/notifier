import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

import {
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import fcmConfig from '../../config/fcm.config';
import { TokensService } from '../../tokens/provider';
import {
  FcmBodyDto,
  PushRequestDto,
} from '../dto';

@Injectable()
export class FcmService {
    private logger = new Logger('fcm-service')

    constructor(
        @Inject(fcmConfig.KEY)
        private readonly config: ConfigType<typeof fcmConfig>,
        private readonly tokensService: TokensService,
    ) {
        admin.initializeApp({
            credential: admin.credential.cert(
                config as ServiceAccount
            )
        })
    }

    async sendPush(message: PushRequestDto) {
        const receivers = await this.tokensService.findAll(
            message.receivers
        )

        this.logger.debug(receivers);

        if (receivers.length === 1) {
            this.sendSingle(receivers[0], message.message)
        } else {
            this.sendMulticast(receivers, message.message)
        }
    }

    private async sendSingle(receiver: string, message: FcmBodyDto) {
        try {

            admin.messaging().send({
                token: receiver,
                data: message
            }).then((result) => {
                this.logger.debug(result);
            })

        } catch (e) {
            this.logger.error(e);
        };
    }

    private async sendMulticast(receivers: string[], message: FcmBodyDto) {
        try {

            await admin.messaging().sendMulticast({
                tokens: receivers,
                data: message
            }).then((result) => {
                this.logger.debug(result);
            });

        } catch (e) {
            this.logger.error(e);
        }
    }
}