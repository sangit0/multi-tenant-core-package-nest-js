import { Model } from "mongoose";
import { v4 as uuid } from 'uuid';
import { BaseEntityDto } from "../contracts/dto/base.dto";
import { IDefaultPermission } from "../contracts/interface/default-permission.interface";
import { ITenantContext } from "../contracts/interface/tenant.interface";
import { getUserDynamicRole } from "../utils/get-dynamic-role";
import { USER_MODEL_NAME } from "../utils/system.config";


/**
 * 
 * @param value 
 * @param tenant 
 * @returns 
 */
export function defaultValueInject<Type extends Partial<BaseEntityDto>>(
    value: Type, permission: IDefaultPermission, tenant: ITenantContext, userId: string, modelName: string): Type {

    value._id = uuid();
    value.tenantId = tenant.tenantId;
    value.rolesAllowedToAdd = permission?.rolesAllowedToAdd || [];
    value.rolesAllowedToEdit = permission?.rolesAllowedToEdit || [];
    value.rolesAllowedToDelete = permission?.rolesAllowedToDelete || [];
    value.rolesAllowedToRead = permission?.rolesAllowedToRead || [];
    value.isMarkedToDelete = permission?.isMarkedToDelete || false;


    /** Injecting Owner dynamic role */
    if (modelName === USER_MODEL_NAME) {
        value = injectDefaultRole(value, getUserDynamicRole(value._id));
    }
    else {
        if (userId) {
            value = injectDefaultRole(value, getUserDynamicRole(userId));
        }
    }
    return value;
}

function injectDefaultRole<Type extends Partial<BaseEntityDto>>(value: Type, defaultRoles: string) {

    value.rolesAllowedToAdd.push(defaultRoles);
    value.rolesAllowedToEdit.push(defaultRoles);
    value.rolesAllowedToDelete.push(defaultRoles);
    value.rolesAllowedToRead.push(defaultRoles);

    return value;
}

export const defaultValueExclude = {

    tenantId: 0,
    rolesAllowedToAdd: 0,
    rolesAllowedToEdit: 0,
    rolesAllowedToDelete: 0,
    rolesAllowedToRead: 0,
    isMarkedToDelete: 0
}

export const excludeDefaultPaginationValue = {

    rolesAllowedToAdd: 0,
    rolesAllowedToEdit: 0,
    rolesAllowedToDelete: 0,
}
