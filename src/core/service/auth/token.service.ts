import {
    Inject,
    Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { ITenantContext } from '../../contracts/interface/tenant.interface';
import { TENANT_CONTEXT } from '../../utils/system.config';
import { IUserInterface } from '../../contracts/interface/user.interface';


/**
 * Token service for decoding all service token if needed - will be published as package for all MS usages
 */
@Injectable()
export class TokenService {
    constructor(
        @Inject(TENANT_CONTEXT) private tenantContext: ITenantContext,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {

    }

    /**
     * 
     * @param payload 
     * @returns token and refresh token
     */
    public async signToken(payload): Promise<{ token: string, refreshToken: string }> {
        return new Promise(async (resolve, reject) => {
            try {
                const token = await this.jwtService.signAsync(payload, {
                    issuer: this.configService.get('JWT_ISSUER'),
                    audience: this.tenantContext.baseUrl,
                    expiresIn: this.configService.get('JWT_EXPIRES'),
                    secret: this.tenantContext.jwtSecret
                });

                /** Later will need redis implementations here for refresh token */
                const refreshToken = await this.jwtService.signAsync({ _id: payload._id, email: payload.email },
                    {
                        secret: this.tenantContext.jwtSecretRefresh,
                        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES')
                    })
                resolve({ token: token, refreshToken });
            } catch (error) {
                reject(false);
                throw error;
            }
        });
    }


    /**
     * 
     * @param accessToken 
     * @param refreshToken 
     * @returns token: string, refreshToken: string
     */
    async refreshToken(accessToken: string, refreshToken: string): Promise<{ token: string, refreshToken: string }> {

        let refreshTokenDecoded: any;
        let accessTokenDecoded: any;
        let payload: any;

        try {
            refreshTokenDecoded = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.tenantContext.jwtSecretRefresh,
                ignoreExpiration: false
            });

            accessTokenDecoded = await this.decodeToken(accessToken, true);

            //delete property of JWT
            delete accessTokenDecoded?.iat;
            delete accessTokenDecoded?.exp;
            delete accessTokenDecoded?.aud;
            delete accessTokenDecoded?.iss;


        } catch (error) {
            throw new UnauthorizedException('Invalid Refresh Token');
        }

        /** Later will need redis implementations for refresh token */


        /** this checks if user is using same token */
        if (!refreshTokenDecoded || (refreshTokenDecoded["email"] !== accessTokenDecoded["email"])) {
            throw new UnauthorizedException('Invalid User');
        }

        return new Promise(async (resolve, reject) => {
            const { token, refreshToken } = await this.signToken(accessTokenDecoded);
            resolve({ token, refreshToken })
        });

    }

    /**
     * 
     * @param accessToken 
     * @param ignoreExpiration 
     * @returns IUserInterface
     */
    public async decodeToken(accessToken, ignoreExpiration = false): Promise<IUserInterface> {
        try {
            const userToken = await this.jwtService.verifyAsync(accessToken, {
                secret: this.tenantContext.jwtSecret,
                ignoreExpiration: ignoreExpiration
            })
            return userToken;

        } catch (error) {
            throw new UnauthorizedException("Invalid Token");
        }
    }
}
