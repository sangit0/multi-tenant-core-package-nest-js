import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginateParams } from './paginate.options.interface';

const DEFAULT_PAGE_SIZE  = 20;
export const PaginateOptions = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginateParams => {
    const request = ctx.switchToHttp().getRequest();
    return {
        limit: parseInt(request.query.limit, 10) || DEFAULT_PAGE_SIZE,
        page: parseInt(request.query.page, 10) || 1
      };
  },
);