import { DynamicModule } from '@nestjs/common';
import { SendGridModuleOptions, SendGridModuleAsyncOptions } from './interfaces';
export declare class SendGridCoreModule {
    static forRoot(options: SendGridModuleOptions): DynamicModule;
    static forRootAsync(options: SendGridModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
