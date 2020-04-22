import { Module, DynamicModule, Global } from '@nestjs/common';
import { SendGridCoreModule } from './sendgrid-core.module';
import { SendGridService } from './services';
import { SendGridModuleOptions, SendGridModuleAsyncOptions } from './interfaces';

@Module({})
export class SendGridModule {
  public static forRoot(options: SendGridModuleOptions): DynamicModule {
    return {
      module: SendGridModule,
      imports: [SendGridCoreModule.forRoot(options)],
    };
  }

  public static forRootAsync(options: SendGridModuleAsyncOptions): DynamicModule {
    return {
      module: SendGridModule,
      imports: [SendGridCoreModule.forRootAsync(options)],
    };
  }
}
