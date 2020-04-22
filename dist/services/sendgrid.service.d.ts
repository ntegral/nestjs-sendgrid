import { SendGridModuleOptions } from '../interfaces/sendgrid-options.interface';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import { ResponseError } from '@sendgrid/helpers/classes';
import { ClientResponse } from '@sendgrid/client/src/response';
export declare class SendGridService {
    private readonly options;
    constructor(options: SendGridModuleOptions);
    send(data: Partial<MailDataRequired> | Partial<MailDataRequired>[], isMultiple?: boolean, cb?: (err: Error | ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]>;
    sendMultiple(data: Partial<MailDataRequired>, cb?: (error: Error | ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]>;
    private mergeWithDefaultMailData;
}
