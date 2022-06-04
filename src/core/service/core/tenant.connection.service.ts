import { BadRequestException, HttpException, HttpStatus, Inject, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Connection, Model, connections, createConnection } from 'mongoose';
import { TenantContextDto } from '../../contracts/dto/tenant.dto';
import { IDatabaseConnection } from '../../contracts/interface/db-connection.interface';
import { ITenantContext } from '../../contracts/interface/tenant.interface';
import { Tenant } from '../../schema/tenant.schema';
import { getHostNameRegex } from '../../utils/system.config';

/**
 * This Connection service is For Getting Connection and Setting Tenant Connections
 */
@Injectable()
export class TenantConnectionService implements IDatabaseConnection {
    constructor(
        @InjectModel(Tenant.name) private tenant: Model<Tenant>) {


    }

    TENANT_CONNECTION_URI: string;

    createTenant(origin: string, tenant: TenantContextDto): Promise<ITenantContext> {
        throw new Error('Method not implemented.');
    }

    async getTenant(origin: string): Promise<ITenantContext> {
        try {
            return await this.tenant.findOne({ origin: getHostNameRegex(origin) });

        } catch (error) {
            throw new BadRequestException("Site not registered.");

        }
    }

    async setDatabaseConnection(tenantUri: string): Promise<Connection> {

        return await createConnection(`${tenantUri}`, { useNewUrlParser: true, useUnifiedTopology: true });

    }

    async getDatabaseConnection(): Promise<Connection> {
        if (!this.TENANT_CONNECTION_URI) {
            throw new HttpException('Invalid tenant db found', HttpStatus.NOT_FOUND);
        }

        // Get the underlying mongoose connections
        const connectedDB: Connection[] = connections;
        // Find existing connection
        const foundConn = connectedDB.find((con: Connection) => {
            return con.name === `${this.TENANT_CONNECTION_URI}`;
        });

        // Check if connection exist and is ready to execute
        if (foundConn && foundConn.readyState === 1) {
            return foundConn;
        }

        // Create a new connection
        return await this.setDatabaseConnection(this.TENANT_CONNECTION_URI);
    }

}
