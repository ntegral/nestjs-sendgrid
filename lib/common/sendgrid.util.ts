import { SendGridModuleOptions } from '../interfaces';
import { SendGridService } from '../services/sendgrid.service';

export function createSendGridClient(options: SendGridModuleOptions): SendGridService {
  const client = new SendGridService(options);
  return client;
}
