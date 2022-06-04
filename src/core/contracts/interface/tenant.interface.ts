
/**
 * Tenant Interface ensuring solid principles
 */

export interface IEmailOptions {
    passwordResetUrl: string;
    passwordResetSubject: string;
    accountActivationUrl?: string;
    accountActivationSubject?: string;
}

export interface IGoogleAuthOptions {
    scope: string[];
    clientId: string;
    clientSecret: string;
    redirectUrl: string;
    authSuccessRedirectUrl: string;
    authFailedRedirectUrl: string;
}


export interface ITenantContext {

    origin: string;
    baseUrl: string; /** Token Domain */
    tenantId: string;
    jwtSecret: string;
    jwtSecretRefresh: string;
    referenceOrigin: string;
    dbUri: string;
    authOptions: string[];
    passwordResetExpires: number;
    accountActivation: boolean;
    accountActivationExpires: number;
    emailOptions?: IEmailOptions;
    googleAuthOptions?: IGoogleAuthOptions
}