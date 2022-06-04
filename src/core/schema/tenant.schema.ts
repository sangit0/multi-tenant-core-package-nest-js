import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { IEmailOptions, IGoogleAuthOptions, ITenantContext } from '../contracts/interface/tenant.interface';


class GoogleAuthOptions implements IGoogleAuthOptions {

    @Prop({ required: true })
    scope: string[];

    @Prop({ required: true })
    clientId: string;

    @Prop({ required: true })
    clientSecret: string;

    @Prop({ required: true })
    redirectUrl: string;

    @Prop({ required: true })
    authSuccessRedirectUrl: string;

    @Prop({ required: true })
    authFailedRedirectUrl: string;

}

class EmailOptions implements IEmailOptions {

    @Prop({ required: true })
    passwordResetUrl: string;

    @Prop({ required: true })
    passwordResetSubject: string;

    @Prop({ required: true })
    accountActivationUrl?: string;

    @Prop({ required: true })
    accountActivationSubject?: string;

}

@Schema({ collection: 'Tenants' })
export class Tenant implements ITenantContext {


    @Prop({ required: true, type: String, default: uuid })
    _id: string

    @Prop({ required: true })
    tenantId: string

    @Prop({ required: true })
    origin: string;

    @Prop({ required: true })
    jwtSecret: string;

    @Prop({ required: true })
    jwtSecretRefresh: string;

    @Prop({ required: true })
    referenceOrigin: string;

    @Prop({ required: true })
    dbUri: string;

    @Prop({ required: true })
    authOptions: string[];

    @Prop({ required: true })
    baseUrl: string;

    @Prop({ required: false, default: 3 })
    passwordResetExpires: number;

    @Prop({ required: false, default: true })
    accountActivation: boolean;

    @Prop({ required: false, default: 3 })
    accountActivationExpires: number;

    @Prop({ required: false, default: 3 })
    emailOptions?: EmailOptions;

    @Prop({ required: false })
    googleAuthOptions?: GoogleAuthOptions;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant)

export type TenantDocument = Tenant & Document
