import { createParamDecorator, ExecutionContext, } from '@nestjs/common';
import { Tenant as TenantSchema } from '../schema/tenant.schema';

export const Tenant = createParamDecorator(
  (data, ctx: ExecutionContext): TenantSchema => {
    const req = ctx.switchToHttp().getRequest();
    return req.tenant;
  },
);
