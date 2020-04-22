import { Inject, Injectable } from '@nestjs/common';
import {
  send,
  sendMultiple,
  setApiKey,
  setSubstitutionWrappers,
} from '@sendgrid/mail';
import { SENDGRID_MODULE_OPTIONS } from '../common/sendgrid.constants';
import { SendGridModuleOptions } from '../interfaces/sendgrid-options.interface';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import { ResponseError } from '@sendgrid/helpers/classes';
import { ClientResponse } from '@sendgrid/client/src/response';
import * as deepmerge from 'deepmerge';

@Injectable()
export class SendGridService {
  constructor(
    @Inject(SENDGRID_MODULE_OPTIONS)
    private readonly options: SendGridModuleOptions,
  ) {
    if (!(options && options.apiKey)) {
      // console.log('options not found. Did you use SendGridModule.forRoot?');
      return;
    }
    setApiKey(options.apiKey);
    // console.log('api key set');
  }

  public async send(
    data: Partial<MailDataRequired> | Partial<MailDataRequired>[],
    isMultiple?: boolean,
    cb?: (err: Error | ResponseError, result: [ClientResponse, {}]) => void,
  ): Promise<[ClientResponse, {}]> {
    if (Array.isArray(data)) {
      return send(data.map((d) => this.mergeWithDefaultMailData(d)) as MailDataRequired[], isMultiple, cb);
    } else {
      return send(this.mergeWithDefaultMailData(data), isMultiple, cb);
    }
  }

  public async sendMultiple(
    data: Partial<MailDataRequired>,
    cb?: (error: Error | ResponseError, result: [ClientResponse, {}]) => void,
  ): Promise<[ClientResponse, {}]> {
    return sendMultiple(this.mergeWithDefaultMailData(data) as MailDataRequired, cb);
  }

  private mergeWithDefaultMailData(data: Partial<MailDataRequired>): MailDataRequired {
    if (!this.options.defaultMailData) {
      return data as MailDataRequired;
    }
    return deepmerge(this.options.defaultMailData, data);
  }
}
