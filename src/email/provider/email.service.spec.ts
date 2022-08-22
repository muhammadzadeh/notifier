import { MailerService } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';

import mailConfig from '../../config/mail.config';
import { EmailService } from './email.service';

const mockMailerService = () => ({
    sendMail: jest.fn(),
});


describe('Email Service', () => {
    let mailerService: MailerService;
    let emailService: EmailService;

    beforeEach(async () => {

        const modue = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    load: [
                        mailConfig,
                    ]
                }),
            ],
            providers: [
                EmailService,
                {
                    provide: MailerService,
                    useFactory: mockMailerService
                },
            ],
        }).compile();
        mailerService = await modue.get<MailerService>(MailerService);
        emailService = await modue.get<EmailService>(EmailService);
    });

    describe('Send Email', () => {
        let then = jest.fn();
        let catche = jest.fn();

        beforeEach(async () => {
            mailerService.sendMail = jest.fn().mockResolvedValue({
                then: then,
                catch: catche,
            });
        });

        it('send Hello', async () => {

            await emailService.sendHello({
                receiver: 'some-valid-email',
                hello: 'Hi'
            });

            expect(mailerService.sendMail).toBeCalled();

        });


    });

});
