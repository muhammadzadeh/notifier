import * as admin from 'firebase-admin';

import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';

import fcmConfig from '../../config/fcm.config';
import { TokensService } from '../../tokens/provider';
import { FcmService } from './fcm.service';

const mockTokenService = () => ({
    findAll: jest.fn(),
});

jest.mock("firebase-admin");

describe('FCM Service', () => {
    let fcmService: FcmService;
    let tokenService: TokensService;

    const mockInitializeAppProperty = admin => {
        const initializeApp = jest.fn();
        Object.defineProperty(admin, 'initializeApp', {
            get: jest.fn(() => initializeApp),
            configurable: true
        });
    };

    const mockMessagingProperty = admin => {
        const messaging = jest.fn().mockReturnValue({
            send: jest.fn().mockResolvedValue({
                catch: jest.fn(),
                then: jest.fn(),
            }),
            sendMulticast: jest.fn().mockResolvedValue({
                catch: jest.fn(),
                then: jest.fn(),
            }),
        });
        Object.defineProperty(admin, 'messaging', {
            get: jest.fn(() => messaging),
            configurable: true
        });
    };

    beforeEach(async () => {

        mockInitializeAppProperty(admin);
        mockMessagingProperty(admin);

        const modue = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    load: [
                        fcmConfig,
                    ]
                }),
            ],
            providers: [
                FcmService,
                {
                    provide: TokensService,
                    useFactory: mockTokenService
                },
            ],
        }).compile();
        fcmService = await modue.get<FcmService>(FcmService);
        tokenService = await modue.get<TokensService>(TokensService);
    });

    describe('sendPush', () => {

        it('send single push success', async () => {

            const mockpushRequestDto = {
                receivers: ['single-user-id'],
                message: {
                    first_key: 'hi from tests'
                }
            }

            tokenService.findAll = jest.fn().mockResolvedValue(['single-fcm-token']);

            expect(tokenService.findAll).not.toBeCalled();

            const result = await fcmService.sendPush(mockpushRequestDto);
            expect(tokenService.findAll).toHaveBeenCalled();
        });

        it('send multi push success', async () => {

            const mockpushRequestDto = {
                receivers: ['user-id-1', 'user-id-2'],
                message: {
                    first_key: 'hi from tests'
                }
            }

            tokenService.findAll = jest.fn().mockResolvedValue(['fcm-token-1', 'fcm-token-2']);

            expect(tokenService.findAll).not.toBeCalled();

            const result = await fcmService.sendPush(mockpushRequestDto);
            expect(tokenService.findAll).toHaveBeenCalled();
        });

    });

});
