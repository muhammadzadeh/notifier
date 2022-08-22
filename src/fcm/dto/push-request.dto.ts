import { FcmBodyDto } from './fcm-body.dto';

export class PushRequestDto {
    receivers: string[]
    message: FcmBodyDto
}