import { IsNotEmpty, IsString, IsObject, IsArray, IsOptional } from 'class-validator';
import { ITenantContext } from '../interface/tenant.interface';
import { BaseEntityDto } from './base.dto';

export class TenantContextDto extends BaseEntityDto implements ITenantContext {

    @IsNotEmpty()
    passwordResetExpires: number;

    @IsNotEmpty()
    accountActivation: boolean;

    @IsNotEmpty()
    accountActivationExpires: number;

    @IsOptional()
    emailOptions?: { passwordResetUrl: string; passwordResetSubject: string; accountActivationUrl: string; accountActivationSubject: string; };

    @IsOptional()
    googleAuthOptions?: { scope: string[]; clientId: string; clientSecret: string; redirectUrl: string; authSuccessRedirectUrl: string; authFailedRedirectUrl: string; };

    @IsNotEmpty()
    @IsString()
    origin: string;

    @IsNotEmpty()
    @IsString()
    referenceOrigin: string;

    // @IsNotEmpty()
    // @IsString()
    // isActive: boolean;

    @IsNotEmpty()
    @IsString()
    dbUri: string;

    @IsNotEmpty()
    @IsString()
    jwtSecret: string;

    @IsNotEmpty()
    @IsString()
    jwtSecretRefresh: string;

    @IsNotEmpty()
    @IsString()
    authOptions: string[];

    @IsNotEmpty()
    @IsString()
    baseUrl: string;

}
