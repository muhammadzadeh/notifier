import { RpcException } from '@nestjs/microservices';

export class TypeAndReceiverRequiredException extends RpcException{
    constructor() {
        super('type and receiver are required')
    }
}