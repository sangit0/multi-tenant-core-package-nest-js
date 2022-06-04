import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Document, EnforceDocument, FilterQuery, Model, Query, UpdateQuery } from 'mongoose';
import { EntityColumnPermission, EntityColumnPermissionDocument } from '../schema/entity-column-permission.schema';
import { getParticularEntityPermission } from '../utils/get-entity-permission';
// import { BaseEntityDto } from '../contracts/dto/base.dto';
import { ITenantContext } from '../contracts/interface/tenant.interface';
import { IUserInterface } from '../contracts/interface/user.interface';

import { defaultValueInject, defaultValueExclude, excludeDefaultPaginationValue } from '../injector/default-value.inject';
import { TENANT_CONTEXT } from '../utils/system.config';
import { paginate, PaginateParams, PaginationResults } from '../paginate';


interface IFilterOptions {
    projection?: any;
    options?: Record<string, unknown>;
    includeDefaultValue?: boolean;
    shouldCheckRoleSecurity?: boolean;
}
/**
 * Abstract base service that other services can extend to provide base CRUD
 * functionality such as to create, find, update and delete data.
 */
export abstract class BaseRepository<T extends Document> {

    @Inject(TENANT_CONTEXT) private tenantContext: ITenantContext;
    @Inject(EntityColumnPermission.name) private modelPermission: Model<EntityColumnPermissionDocument>;

    @Inject(REQUEST) private readonly request;

    constructor(private model: Model<T>) {

    }

    public getModel(): Model<T> {
        return this.model;
    }

    private getUser(): IUserInterface {
        return this.request?.user || {};
    }

    async findAllWithPaginate(
        conditions: Partial<Record<keyof T, unknown>>,
        paginateParams: PaginateParams,
        filterOptions?: IFilterOptions,
    ): Promise<PaginationResults<T>> {
        try {
            conditions = {
                ...conditions,
                tenantId: this.tenantContext.tenantId,
                isMarkedToDelete: false
            };

            if (filterOptions?.shouldCheckRoleSecurity) {
                conditions = {
                    ...conditions,
                    rolesAllowedToRead: { $in: this.getUser().roles }
                };
            }

            const projection = filterOptions?.includeDefaultValue ? { ...filterOptions?.projection } : { ...filterOptions?.projection, ...excludeDefaultPaginationValue } || {};

            return await paginate<T>(paginateParams, this.getModel(), conditions, projection);

        } catch (err) {
            throw err;
        }
    }

    find(
        conditions: Partial<Record<keyof T, unknown>>,
        filterOptions?: IFilterOptions
    ): Query<EnforceDocument<T, {}>[], EnforceDocument<T, {}>, {}> {
        try {
            conditions = {
                ...conditions,
                tenantId: this.tenantContext.tenantId,
                isMarkedToDelete: false
            };

            if (filterOptions?.shouldCheckRoleSecurity) {
                conditions = {
                    ...conditions,
                    rolesAllowedToRead: { $in: this.getUser().roles }
                };
            }

            const projection = filterOptions?.includeDefaultValue ? filterOptions?.projection : { ...filterOptions?.projection, ...defaultValueExclude } || {};

            return this.model.find(
                conditions as FilterQuery<T>,
                projection,
                filterOptions?.options || {},
            );

        } catch (err) {
            throw err;
        }
    }
    findOne(
        conditions: Partial<Record<keyof T, unknown>>,
        filterOptions?: IFilterOptions
    ): Query<EnforceDocument<T, {}>, EnforceDocument<T, {}>, {}> {
        try {
            conditions = {
                ...conditions,
                tenantId: this.tenantContext.tenantId,
                isMarkedToDelete: false
            }

            if (filterOptions?.shouldCheckRoleSecurity) {
                conditions = {
                    ...conditions,
                    rolesAllowedToRead: { $in: this.getUser().roles }
                };
            }

            const projection = filterOptions?.includeDefaultValue ? filterOptions?.projection : { ...filterOptions?.projection, ...defaultValueExclude } || {}

            return this.model.findOne(
                conditions as FilterQuery<T>,
                projection,
                filterOptions?.options || {},
            );
        } catch (err) {
            throw err;
        }
    }

    async create(
        data: any,
    ): Promise<any> {
        try {

            const userId: string = this.getUser()._id || null;
            const entityPermissions = await getParticularEntityPermission(this.model.modelName, this.modelPermission);

            const dataModel = new this.model(defaultValueInject<any>(data, entityPermissions?.defaultRowPermissions, this.tenantContext, userId, this.model.modelName));
            await dataModel.save();
            return data;

        } catch (err) {
            throw err;
        }
    }

    async update(
        id: string,
        data: UpdateQuery<EnforceDocument<T, {}>>,
        shouldCheckRoleSecurity: boolean = false
    ): Promise<any> {
        try {

            let conditions: any = {
                _id: id,
                tenantId: this.tenantContext.tenantId,
            }

            if (shouldCheckRoleSecurity) {
                conditions = {
                    ...conditions,
                    rolesAllowedToEdit: { $in: this.getUser().roles },
                }
            }

            let dataModel = await this.model.findOne(conditions as FilterQuery<T>);
            if (dataModel) {
                return await dataModel.updateOne({ ...data }, { new: true });
            }
            else {
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: "User don't have update permission! or no found document",
                }, 403);
            }

        } catch (err) {
            throw err;
        }
    }

    async delete(
        id: string,
        shouldCheckRoleSecurity: boolean = false
    ): Promise<void> {
        try {
            let conditions: any = {
                _id: id,
                tenantId: this.tenantContext.tenantId,
            }

            if (shouldCheckRoleSecurity) {
                conditions = {
                    ...conditions,
                    rolesAllowedToDelete: { $in: this.getUser().roles },
                }
            }

            let dataModel = await this.model.findOne(conditions as FilterQuery<T>);
            if (dataModel) {
                await this.model.deleteOne(conditions as FilterQuery<T>);
            }
            else {

                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: "User don't have delete permission! or not found document",
                }, 403);
            }

        } catch (err) {
            throw err;
        }
    }

    async softDelete(
        id: string,
        shouldCheckRoleSecurity: boolean = false
    ): Promise<void> {
        try {
            let conditions: any = {
                _id: id,
                tenantId: this.tenantContext.tenantId,
            }

            if (shouldCheckRoleSecurity) {
                conditions = {
                    ...conditions,
                    rolesAllowedToDelete: { $in: this.getUser().roles },
                }
            }

            let dataModel = await this.model.findOne(conditions as FilterQuery<T>);
            if (dataModel) {

                const data: any = {
                    isMarkedToDelete: true
                }

                await dataModel.updateOne(data);
            }
            else {

                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: "User don't have delete permission!",
                }, 403);
            }

        } catch (err) {
            throw err;
        }
    }

}