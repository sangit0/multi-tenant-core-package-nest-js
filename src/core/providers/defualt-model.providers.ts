import { EntityColumnPermission, EntityColumnPermissionSchema } from "../schema/entity-column-permission.schema";
import { RegisterModelsProviders } from "./model-register.providers";

export const RegisterDefaultModelProviders = () => {
    /**
    *  Entity row level and column level permission resolver - TENANT_OWN_DB_CONNECTION
    */
    return RegisterModelsProviders([
        {
            name: EntityColumnPermission.name,
            schema: EntityColumnPermissionSchema
        }
    ]);
}