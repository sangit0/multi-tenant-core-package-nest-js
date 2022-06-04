import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserInterface } from '../contracts/interface/user.interface';

export const GetUser = createParamDecorator(
    (data, ctx: ExecutionContext): IUserInterface => {
        const req = ctx.switchToHttp().getRequest();
        return req.user;
    },
);
