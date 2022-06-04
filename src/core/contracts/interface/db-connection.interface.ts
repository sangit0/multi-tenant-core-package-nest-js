import { Connection, } from 'mongoose';
import { ITenantContext } from './tenant.interface';

/**
 * Interface ensuring solid principles
 */
export interface IDatabaseConnection {

    readonly TENANT_CONNECTION_URI: string;

    createTenant(origin: string, tenant: ITenantContext): Promise<ITenantContext>;
    getTenant(origin: string): Promise<ITenantContext>;
    setDatabaseConnection(tenantId: string): Promise<Connection>;
    getDatabaseConnection(): Promise<Connection>;

}