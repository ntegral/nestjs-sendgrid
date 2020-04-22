import { Test, TestingModule } from '@nestjs/testing';
import { SendGridModuleOptions } from "../interfaces"
import { Injectable } from '@nestjs/common';
import { InjectSendGrid } from './sendgrid.decorator';
import { SendGridService } from '../services/sendgrid.service';
import { SendGridModule } from '../sendgrid.module';


describe('InjectSentry', () => {

    let config: SendGridModuleOptions = {
        apiKey: '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'
    };

    let module: TestingModule;

    @Injectable()
    class InjectableService {
        public constructor(@InjectSendGrid() public readonly client: SendGridService) {}
    }

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [SendGridModule.forRoot(config)],
            providers: [InjectableService],
        }).compile();
    });

    describe('when decorating a class constructor parameter', () => {
        it('should inject the sendgrid client', () => {
            const testService = module.get(InjectableService);
            expect(testService).toHaveProperty('client');
            expect(testService.client).toBeInstanceOf(SendGridService);
        });
    }); 

    describe('send test message', () => {
        it('should send a sample email using the client', async() => {
            const testService = module.get(InjectableService);
            const resp = await testService.client.send({to:'dhardy@utherwise.com', from:'hello@utherwise.com', subject: 'jest testing', text: 'booyah' });
            console.log('what was the response', resp);
            expect(resp).toBeDefined();
        })
    })

    describe('send multiple test messagse', () => {
        it('should send a sample email using the client', async() => {
            const testService = module.get(InjectableService);
            const data = [{to:'dhardy@utherwise.com', from:'hello@utherwise.com', subject: 'jest testing', text: 'multiple message 1' },{to:'dhardy@utherwise.com', from:'hello@utherwise.com', subject: 'jest testing', text: 'multiple message 2' }]
            const resp = await testService.client.send(data);
            console.log('what was the multiple response', resp);
            expect(resp).toBeDefined();
        })
    })

    describe('send multiple test messagses method', () => {
        it('should send a sample email using the client send multiple method', async() => {
            const testService = module.get(InjectableService);
            // const data = [{to:'dhardy@utherwise.com', from:'hello@utherwise.com', subject: 'jest testing', text: 'multiple message 1' },{to:'dhardy@utherwise.com', from:'hello@utherwise.com', subject: 'jest testing', text: 'multiple message 2' }]
            const resp = await testService.client.sendMultiple({to:'dhardy@utherwise.com', from:'hello@utherwise.com', subject: 'jest testing', text: 'multiple message 1' });
            console.log('what was the multiple response', resp);
            expect(resp).toBeDefined();
        })
    })
})