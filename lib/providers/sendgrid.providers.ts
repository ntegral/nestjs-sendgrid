import { Provider } from '@nestjs/common';
import { SendGridModuleOptions } from '../interfaces/sendgrid-options.interface';
import { SENDGRID_TOKEN } from '../common/sendgrid.constants';
import { createSendGridClient } from '../common/sendgrid.util';

export function createSendGridProviders(
  options: SendGridModuleOptions,
): Provider {
  return {
    provide: SENDGRID_TOKEN,
    useValue: createSendGridClient(options),
  };
}
