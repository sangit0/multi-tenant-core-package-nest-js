import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { Model } from "mongoose";
import { EntityColumnPermissionDocument } from "../schema/entity-column-permission.schema";
import { entityTypesToExclude } from "./system.config";



export async function getParticularEntityPermission(entity: string, epModel: Model<EntityColumnPermissionDocument, {}, {}>,
    shouldThrowSecurityError = false) {

    const filter = { entityName: entity };


    if (shouldThrowSecurityError) {
        if (entityTypesToExclude.includes(entity.toLocaleLowerCase())) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Can't run entity query for this entity!",
            }, 403);
        }

    }
    const entityPermission = await epModel.findOne(filter);

    if (shouldThrowSecurityError) {
        //if no entity column permission found 
        if (!entityPermission) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: "No entity permission found!",
            }, 403);
        }

    }
    return entityPermission;
}