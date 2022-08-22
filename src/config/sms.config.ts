import { registerAs } from '@nestjs/config';

export default registerAs('sms', () => ({
    apiToken: process.env.KAVEHNEGAR_API_KEY
}))