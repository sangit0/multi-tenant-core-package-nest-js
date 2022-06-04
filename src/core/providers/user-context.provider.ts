import { Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { IUserInterface } from "../contracts/interface/user.interface";
import { USER_CONTEXT } from "../utils/system.config";

/**
 * We won't expose it to NPM - Sangit ; important
 */
export const UserContextProvider = [

    /** USER_CONTEXT global injection to all service  */
    {
        provide: USER_CONTEXT,
        scope: Scope.REQUEST,
        inject: [REQUEST],
        useFactory: (req: Request): IUserInterface => {
            const { user } = req as any;
            return user;
        },
    },

];