import { HttpException, HttpService, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { request } from 'http';
import { ITenantContext } from '../contracts/interface/tenant.interface';
import { IUserInterface } from '../contracts/interface/user.interface';
import { TenantConnectionService } from '../service/core/tenant.connection.service';
import { DefaultGuestName, DefaultRoles } from '../utils/system.config';

@Injectable()
export class TenantMiddleWare implements NestMiddleware {
  constructor(private tenantConnectionService: TenantConnectionService) {

  }

  /**
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  async use(req: any, res: any, next: () => void) {

    if (!req.headers.origin) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: "origin undefined! or not supported request from this origin",
      }, 403);
    }

    /** Here we are  setting up tenant - and validating if tenant registered */
    try {
      const origin = req.headers.origin;
      const tenant: ITenantContext = await this.tenantConnectionService.getTenant(origin);

      if (!tenant) {
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: "wrong tenant! or not supported request from this origin",
        }, 403);
      }

      req.tenant = tenant;

      /** Assign Guest User If No User  -  */
      /**
       *  This is a dummy guest user and will be replaced later if you use token auth guard in the route
       */
      const user: IUserInterface = {
        _id: null,
        displayName: DefaultGuestName,
        email: "",
        origin: tenant.origin,
        roles: [DefaultRoles.DefaultGuestRole]
      }
      req.user = user;


    } catch (error) {
      throw error;
    }


    next();
  }
}
