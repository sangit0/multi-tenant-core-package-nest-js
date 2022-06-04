
import { IsNotEmpty, IsString, IsBoolean, IsArray, IsOptional, isBoolean } from 'class-validator';
import { IDefaultPermission } from '../interface/default-permission.interface';

export class BaseEntityDto implements IDefaultPermission {
    @IsOptional()
    @IsString()
    _id: string;

    @IsOptional()
    @IsString()
    tenantId: string

    @IsOptional()
    @IsArray()
    rolesAllowedToEdit: string[] = [];

    @IsOptional()
    @IsArray()
    rolesAllowedToDelete: string[] = [];;

    @IsOptional()
    @IsArray()
    rolesAllowedToAdd: string[] = [];;

    @IsOptional()
    @IsArray()
    rolesAllowedToRead: string[] = [];;

    @IsOptional()
    @IsBoolean()
    isMarkedToDelete?: boolean = false;

}