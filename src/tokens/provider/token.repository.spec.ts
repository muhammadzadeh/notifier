import { Repository } from 'typeorm';

import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { TokenEntity } from '../entity/token.entity';
import { TokensRepository } from './tokens.repository';

export type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    findOne: jest.fn(entity => entity),
    create: jest.fn().mockReturnValue({
        userId: '',
        token: '',
        save: jest.fn().mockResolvedValue({
            then: jest.fn(),
            catche: jest.fn(),
        }),
    }),
    save: jest.fn().mockResolvedValue({
        then: jest.fn(),
        catche: jest.fn(),
    }),
    createQueryBuilder: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
            getMany: jest.fn().mockResolvedValue([
                {
                    userId: 'user-id-1',
                    toke: 'token-id-1'
                },
                {
                    userId: 'user-id-2',
                    toke: 'token-id-2'
                }
            ])
        })
    })
}));


describe('Token Repository', () => {
    let repositoryMock: MockType<Repository<TokenEntity>>;
    let tokenRepository: TokensRepository;

    beforeEach(async () => {

        const module = await Test.createTestingModule({
            imports: [

            ],
            providers: [
                TokensRepository,
                {
                    provide: getRepositoryToken(TokenEntity),
                    useFactory: repositoryMockFactory
                },
            ],
        }).compile();
        repositoryMock = await module.get(getRepositoryToken(TokenEntity));
        tokenRepository = await module.get<TokensRepository>(TokensRepository);
    });

    describe('Create One Token', () => {

        it('ctreate token', async () => {

            await tokenRepository.createOne({
                userId: 'user-id-1',
                token: 'token'
            });

            expect(repositoryMock.create).toBeCalledTimes(1);

        });

    });

    describe('Find All Tokens', () => {

        it('Find All Successfully', async () => {

            const result = await tokenRepository.findAll([
                'user-id-1',
                'user-id-2'
            ]);

            expect(result.length).toBe(2);
            expect(repositoryMock.createQueryBuilder).toBeCalledTimes(1);

        });

    });

});
