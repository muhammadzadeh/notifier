import {
  Injectable,
  Logger,
} from '@nestjs/common';

import { CreateTokenDto } from '../dto/create-tokens.dto';
import { TokensRepository } from './tokens.repository';

@Injectable()
export class TokensService {
    private logger = new Logger('tokens-service');
    constructor(
        private readonly tokensRepository: TokensRepository
    ) { }

    async createOne(createDto: CreateTokenDto) {
        await this.tokensRepository.createOne(createDto)
    }

    async findAll(
        users: string[]
    ): Promise<string[]> {
        const tokens = await this.tokensRepository.findAll(users);
        this.logger.debug(tokens)
        return tokens ? tokens.map((item) => item.token) : []
    }
}