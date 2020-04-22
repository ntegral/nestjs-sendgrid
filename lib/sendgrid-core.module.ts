import { Global, Module, DynamicModule, Provider, Type } from '@nestjs/common';
import { SendGridModuleOptions, SendGridModuleAsyncOptions, SendGridOptionsFactory } from './interfaces';
import { createSendGridProviders } from './providers';
import { SENDGRID_MODULE_OPTIONS, SENDGRID_TOKEN } from './common/sendgrid.constants';
import { createSendGridClient } from './common/sendgrid.util';

@Global()
@Module({})
export class SendGridCoreModule {
    public static forRoot(options: SendGridModuleOptions): DynamicModule {
        const provider = createSendGridProviders(options);

        return {
            exports: [provider,],
            module: SendGridCoreModule,
            providers: [provider]
        };
    }

    public static forRootAsync(options: SendGridModuleAsyncOptions): DynamicModule {
        const provider: Provider = {
            inject: [SENDGRID_MODULE_OPTIONS],
            provide: SENDGRID_TOKEN,
            useFactory: (options: SendGridModuleOptions) => createSendGridClient(options),
        };

        return {
            exports: [provider],
            imports: options.imports,
            module: SendGridCoreModule,
            providers: [...this.createAsyncProviders(options), provider]
        };
    }

    private static createAsyncProviders(
        options: SendGridModuleAsyncOptions,
      ): Provider[] {
        if (options.useExisting || options.useFactory) {
          return [this.createAsyncOptionsProvider(options)];
        }
        const useClass = options.useClass as Type<SendGridOptionsFactory>;
        return [
          this.createAsyncOptionsProvider(options),
          {
            provide: useClass,
            useClass,
          },
        ];
      }
    
      private static createAsyncOptionsProvider(
        options: SendGridModuleAsyncOptions,
      ): Provider {
        if (options.useFactory) {
          return {
            inject: options.inject || [],
            provide: SENDGRID_MODULE_OPTIONS,
            useFactory: options.useFactory,
          };
        }
        const inject = [
          (options.useClass || options.useExisting) as Type<SendGridOptionsFactory>,
        ];
        return {
          provide: SENDGRID_MODULE_OPTIONS,
          useFactory: async (optionsFactory: SendGridOptionsFactory) =>
            await optionsFactory.createSendGridOptions(),
          inject,
        };
      }
}