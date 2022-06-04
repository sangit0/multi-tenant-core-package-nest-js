import { Global, DynamicModule, Provider, Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantConnectionProviderFactory } from "./providers/tenant-connection.provider";
import { TenantMiddleWare } from "./middleware/tenant.middleware";
import { Tenant, TenantSchema } from "./schema/tenant.schema";
import { EntityColumnPermission, EntityColumnPermissionSchema } from "./schema/entity-column-permission.schema";
import { SWAGGER_API_DOC_URL, TENANT_REGISTERED_DB_CONNECTION } from "./utils/system.config";
import { TenantConnectionService } from "./service/core/tenant.connection.service";
import { TokenService } from "./service/auth/token.service";
import { UserContextProvider } from "./providers/user-context.provider";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from '@nestjs/passport';
import { RegisterModelsProviders } from "./providers/model-register.providers";
import { RegisterDefaultModelProviders } from "./providers/defualt-model.providers";


@Global()
@Module({})
export class TenantCoreModule implements NestModule {

    /**
     * 
     * @param consumer 
     */
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TenantMiddleWare)
            .exclude({ path: SWAGGER_API_DOC_URL, method: RequestMethod.GET })
            .forRoutes("*");
    }

    /**
     * 
     * @param MONGODB_URI_TENANT_DB_ENV_NAME 
     * @param ENVIRONMENT_FOLDER_NAME 
     * @returns 
     */
    static register(MONGODB_URI_TENANT_DB_ENV_NAME: string, ENVIRONMENT_FOLDER_NAME: string): DynamicModule {

        return {
            module: TenantCoreModule,
            imports: [
                PassportModule,

                /**
                 * From where JWT will get options
                 */
                JwtModule.register({
                    signOptions: {
                        expiresIn: process.env.JWT_EXPIRES,
                    }
                }),


                ConfigModule.forRoot({
                    envFilePath: `${ENVIRONMENT_FOLDER_NAME}/${process.env.NODE_ENV}.env`,
                    isGlobal: true,
                }),
                /**
                 * Tenant Registrations DB connections
                 */
                MongooseModule.forRootAsync({
                    imports: [ConfigModule],
                    connectionName: TENANT_REGISTERED_DB_CONNECTION, /** Important TenantRegistration depends on this injection - TENANT_REGISTERED_DB_CONNECTION */
                    useFactory: async (configService: ConfigService) => ({
                        uri: configService.get<string>(MONGODB_URI_TENANT_DB_ENV_NAME),
                    }),
                    inject: [ConfigService],
                }),

                /**
                * Tenant DB and giving using it by a connection name - TENANT_REGISTERED_DB_CONNECTION
                */
                MongooseModule.forFeature([
                    {
                        name: Tenant.name,
                        schema: TenantSchema,
                    }
                ], TENANT_REGISTERED_DB_CONNECTION),
            ],
            providers: [
                /**
                 * Tenant DB and Providers Factories
                 */
                ...TenantConnectionProviderFactory,
                // ...UserContextProvider,
                TenantConnectionService,

                ...RegisterDefaultModelProviders(),
                /** TokenService - UAM and business service use this if needed */
                TokenService
            ],
            exports: [
                TokenService,
                ...TenantConnectionProviderFactory,
                // ...UserContextProvider, 
                ...RegisterDefaultModelProviders()]
        };
    }
}