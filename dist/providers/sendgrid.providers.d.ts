import { Provider } from '@nestjs/common';
import { SendGridModuleOptions } from '../interfaces/sendgrid-options.interface';
export declare function createSendGridProviders(options: SendGridModuleOptions): Provider;
