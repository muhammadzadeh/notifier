import { Test } from '@nestjs/testing';

import { TokensRepository } from './tokens.repository';
import { TokensService } from './tokens.service';

const mockTokenRepository = () => ({
    createOne: jest.fn(),
    findAll: jest.fn(),
})

describe('Token Service', () => {
    let tokenRepository: TokensRepository;
    let tokenService: TokensService;

    beforeEach(async () => {

        const module = await Test.createTestingModule({
            providers: [
                TokensService,
                {
                    provide: TokensRepository,
                    useFactory: mockTokenRepository
                },
            ],
        }).compile();
        
        tokenRepository = await module.get<TokensRepository>(TokensRepository);
        tokenService = await module.get<TokensService>(TokensService);
    });

    describe('Create One Token', () => {

        it('ctreate token successfully', async () => {

            await tokenService.createOne({
                userId: 'user-id-1',
                token: 'token'
            });

            expect(tokenRepository.createOne).toBeCalledTimes(1);

        });

    });

    describe('Find All Tokens', () => {

        it('Find All Successfully', async () => {

            tokenRepository.findAll = jest.fn().mockResolvedValue([
                'token-1',
                'token-2',
            ])

            const result = await tokenService.findAll([
                'user-id-1',
                'user-id-2'
            ]);

            expect(result.length).toBe(2);
            expect(tokenRepository.findAll).toBeCalledTimes(1);

        });

        it('Find Some Successfully', async () => {

            tokenRepository.findAll = jest.fn().mockResolvedValue([
                'token-3',
            ])

            const result = await tokenService.findAll([
                'user-id-3',
                'user-id-4'
            ]);

            expect(result.length).toBe(1);
            expect(tokenRepository.findAll).toBeCalledTimes(1);

        });

    });

});
