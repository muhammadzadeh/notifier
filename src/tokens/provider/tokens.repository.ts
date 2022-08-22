import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTokenDto } from '../dto/create-tokens.dto';
import { TokenEntity } from '../entity/token.entity';

@Injectable()
export class TokensRepository{

    constructor(
        @InjectRepository(TokenEntity)
        private repository: Repository<TokenEntity>,
    ) { }

    async createOne(createDto: CreateTokenDto) {

        let token = this.repository.create()
        token.userId = createDto.userId
        token.token = createDto.token
        token.save().catch((e) => { })

    }

    async findAll(
        users: string[]
    ): Promise<TokenEntity[]> {
        return await this.repository
            .createQueryBuilder('token')
            .where("user_id IN (:...users)", { users: users })
            .getMany();

    }
}