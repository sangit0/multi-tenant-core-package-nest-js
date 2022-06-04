import { EnforceDocument, Query, UpdateQuery } from "mongoose";
import { BaseEntityDto } from "../dto/base.dto";


export interface IBaseRepository<T> {
    find(
        conditions: Partial<Record<keyof T, unknown>>,
        projection,
        options: Record<string, unknown>,
        shouldDefaultValueExclude: boolean
    ): Query<EnforceDocument<T, {}>[], EnforceDocument<T, {}>, {}>;

    findOne(
        conditions: Partial<Record<keyof T, unknown>>,
        projection,
        options: Record<string, unknown>,
        shouldDefaultValueExclude: boolean,
    ): Query<EnforceDocument<T, {}>, EnforceDocument<T, {}>, {}>;

    create<TypeDto extends BaseEntityDto>(
        data: TypeDto,
    ): Promise<TypeDto>;

    update(
        id: string,
        data: UpdateQuery<EnforceDocument<T, {}>>,
    ): Promise<any>

    delete(
        id: string,
    ): Promise<void>

    softDelete(
        id: string,
    ): Promise<void>

}
