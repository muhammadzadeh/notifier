import {
  HandlebarsAdapter,
} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
    transport: {
        host: process.env.SMTP_HOST,
        port: +process.env.SMTP_PORT,
        ignoreTLS: false,
        secure: true,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    },
    defaults: {
        from: `${process.env.MAIL_DEFAULT_FROM_ACCOUNT}`,
    },
    template: {
        dir: __dirname + '/../email/templates',
        adapter: new HandlebarsAdapter(),
        options: {
            strict: true,
        },
    },
}))