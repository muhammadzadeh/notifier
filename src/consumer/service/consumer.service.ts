
import {
  Injectable,
  Logger
} from '@nestjs/common';

@Injectable()
export class ConsumerService {

  private logger = new Logger(ConsumerService.name);

  constructor(
  ) { }

}
