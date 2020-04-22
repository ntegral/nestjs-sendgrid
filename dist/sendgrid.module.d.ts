import { DynamicModule } from '@nestjs/common';
import { SendGridModuleOptions, SendGridModuleAsyncOptions } from './interfaces';
export declare class SendGridModule {
    static forRoot(options: SendGridModuleOptions): DynamicModule;
    static forRootAsync(options: SendGridModuleAsyncOptions): DynamicModule;
}
