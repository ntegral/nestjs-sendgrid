import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
export interface SendGridModuleOptions {
    apiKey: string;
    defaultMailData?: MailDataRequired;
    substitutionWrappers?: {
        left: string;
        right: string;
    };
}
export interface SendGridOptionsFactory {
    createSendGridOptions(): Promise<SendGridModuleOptions> | SendGridModuleOptions;
}
export interface SendGridModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useClass?: Type<SendGridOptionsFactory>;
    useExisting?: Type<SendGridOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<SendGridModuleOptions> | SendGridModuleOptions;
}
