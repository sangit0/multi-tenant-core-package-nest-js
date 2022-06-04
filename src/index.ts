/** Exports of the things by which others module will use best of this package */

export { TenantCoreModule } from "./core/core.module"

/** DTO exports */
export { BaseEntityDto } from "./core/contracts/dto/base.dto"
export { TenantContextDto } from "./core/contracts/dto/tenant.dto"
export { BaseUserDTO } from "./core/contracts/dto/user.dto"

/** Interfaces exports */
export { ITenantContext } from "./core/contracts/interface/tenant.interface"
export { IUserInterface } from "./core/contracts/interface/user.interface"
export { IDefaultPermission } from "./core/contracts/interface/default-permission.interface"

/** Response and  validation type */
export { IResponseResults } from "./core/contracts/response/response.interface"
export { ValidationResult } from "./core/contracts/response/validation.type.class"
export { ErrorType } from "./core/contracts/response/validation.type.class"

/** Decorators exports */
export { Tenant } from "./core/decorators/get-tenant.decorator"
export { GetUser } from "./core/decorators/get-user.decorator"
export { Role } from "./core/decorators/role.decorator"

/** Guard exports */
export { RolesGuard } from "./core/guards/role.guard"
export { TokenAuthGuard } from "./core/guards/token.auth.guard"
/** Token Service exports */
export { TokenService } from "./core/service/auth/token.service";

/** Default value injector exports */
export { defaultValueInject, defaultValueExclude } from "./core/injector/default-value.inject"

/** RegisterModelsProviders exports */
export { RegisterModelsProviders } from "./core/providers/model-register.providers"

/** BaseEntity exports */
export { BaseEntity } from "./core/schema/base.schema";

/** BaseRepository exports */
export { BaseRepository } from "./core/repository/repository.abstract.service";
export { IBaseRepository } from "./core/contracts/interface/repository.interface";
export { IController } from "./core/contracts/interface/controllers.interface";

/** Entity permission and related exports */
export { getParticularEntityPermission } from "./core/utils/get-entity-permission"

/** TENANT_CONTEXT  TENANT_OWN_DB_CONNECTION DefaultGuestRole exports */
export { TENANT_CONTEXT, TENANT_OWN_DB_CONNECTION, DefaultGuestRole, DefaultGuestName, DefaultRoles, USER_MODEL_NAME } from "./core/utils/system.config"

export { paginate, PaginateParams, PaginateResultInterface, PaginationResults, PaginateOptions } from "./core/paginate";