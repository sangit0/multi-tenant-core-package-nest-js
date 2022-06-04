import { Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Connection } from "mongoose";
import { ITenantContext } from "../contracts/interface/tenant.interface";
import { TenantConnectionService } from "../service/core/tenant.connection.service";
import { TENANT_CONTEXT, TENANT_OWN_DB_CONNECTION } from "../utils/system.config";

/**
 * We won't expose it to NPM - Sangit ; important
 */
export const TenantConnectionProviderFactory = [

    /** TENANT_CONTEXT global injection to all service  */
    {
        provide: TENANT_CONTEXT,
        scope: Scope.REQUEST,
        inject: [REQUEST],
        useFactory: (req: Request): ITenantContext => {
            const { tenant } = req as any;
            return tenant;
        },
    },

    /** TENANT_OWN_DB_CONNECTION - Injection ensure that tenant-wise db connection from db URL as it's depends on TENANT_CONTEXT -Sangit  */
    {
        provide: TENANT_OWN_DB_CONNECTION,
        useFactory: async (context: ITenantContext, connection: TenantConnectionService): Promise<Connection> => {
            // Set tenant context
            connection.TENANT_CONNECTION_URI = context.dbUri;
            // Return the connection
            return connection.getDatabaseConnection();
        },
        inject: [TENANT_CONTEXT, TenantConnectionService],
    },

];