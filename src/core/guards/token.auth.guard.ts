import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, BadRequestException, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ITenantContext } from '../contracts/interface/tenant.interface';
import { IUserInterface } from '../contracts/interface/user.interface';
import { TokenService } from '../service/auth/token.service';
import { getUserDynamicRole } from '../utils/get-dynamic-role';
import { DefaultGuestName, DefaultGuestRole, TENANT_CONTEXT } from '../utils/system.config';

/** Token Auth Guard - If no user will return Guest User */
@Injectable()
export class TokenAuthGuard implements CanActivate {
    constructor(private tokenService: TokenService, @Inject(TENANT_CONTEXT) private tenantContext: ITenantContext) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        try {

            const token = (request.headers.authorization || request.cookies[`${this.tenantContext.origin}`] || '') || "";
            request.token = token.replace('Bearer ', '');


            /** If auth token */
            if (request.token) {
                try {
                    let user: IUserInterface = await this.tokenService.decodeToken(request.token);

                    /** Injecting Owner dynamic role */
                    user.roles.push(getUserDynamicRole(user._id));

                    request.user = user;

                    return true;

                } catch (error) {
                    throw error
                }
            }
            else {
                throw new HttpException({
                    status: HttpStatus.UNAUTHORIZED,
                    error: "Unauthorized",
                }, 401);
            }

        } catch (error) {
            throw error;
        }
    }
}
