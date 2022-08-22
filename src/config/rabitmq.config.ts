import { registerAs } from '@nestjs/config';

export default registerAs('rabitmq', () => ({
  exchanges: [
    {
      name: process.env.RMQ_EXCHANGE,
      type: 'direct',
    },
  ],
  uri: process.env.RMQ_URL,
  enableControllerDiscovery: true,
  channels: {
    sms_queue: {
      prefetchCount: 1,
      default: true,
    },
    email_queue: {
      prefetchCount: 1,
    },
    fcm_quque: {
      prefetchCount: 1,
    },
  },
}))

