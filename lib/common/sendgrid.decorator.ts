import { Inject } from '@nestjs/common';
import { SENDGRID_TOKEN } from './sendgrid.constants';

export function InjectSendGrid() {
  return Inject(SENDGRID_TOKEN);
}
