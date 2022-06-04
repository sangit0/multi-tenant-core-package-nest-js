import { IsNotEmpty, IsString, IsArray, IsOptional, IsBoolean } from 'class-validator';
import { BaseEntityDto } from './base.dto';

export class BaseUserDTO extends BaseEntityDto {

    @IsNotEmpty()
    @IsString()
    displayName: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsArray()
    @IsNotEmpty()
    roles: string[];


    @IsBoolean()
    @IsNotEmpty()
    origin: string;


}
