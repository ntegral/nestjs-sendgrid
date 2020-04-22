import { Test } from '@nestjs/testing';

import { SendGridModuleOptions, SendGridOptionsFactory } from './interfaces';
import { SendGridModule } from './sendgrid.module';
import { SendGridService } from './services/sendgrid.service';
import { SENDGRID_TOKEN } from './common/sendgrid.constants';

describe('SendGridModule', () => {
    let config: SendGridModuleOptions = {
        apiKey: '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'
    };

    class TestService implements SendGridOptionsFactory {
        createSendGridOptions(): SendGridModuleOptions {
            return config;
        }
    }

    describe('forRoot', () => {
        it('should provide the sentry client', async() => {
            const mod = await Test.createTestingModule({
                imports: [SendGridModule.forRoot(config)],
            }).compile();

            const sentry = mod.get<SendGridService>(SENDGRID_TOKEN);
            console.log('sentry', sentry);
            expect(sentry).toBeDefined();
            expect(sentry).toBeInstanceOf(SendGridService);
        });
    });

    describe('forRootAsync', () => {
        describe('when the `useFactory` option is used', () => {
            it('should provide sentry client', async () => {
                const mod = await Test.createTestingModule({
                    imports: [
                        SendGridModule.forRootAsync({
                            useFactory: () => (config),
                        }),
                    ]
                }).compile();

                const sentry = mod.get<SendGridService>(SENDGRID_TOKEN);
                expect(sentry).toBeDefined();
                expect(sentry).toBeInstanceOf(SendGridService);
            });
        })
    });

    describe('when the `useClass` option is used', () => {
        it('should provide the sentry client', async () => {
            const mod = await Test.createTestingModule({
                imports: [
                    SendGridModule.forRootAsync({
                        useClass: TestService
                    })
                ]
            }).compile();

            const sentry = mod.get<SendGridService>(SENDGRID_TOKEN);
            expect(sentry).toBeDefined();
            expect(sentry).toBeInstanceOf(SendGridService);
        });
    });
})