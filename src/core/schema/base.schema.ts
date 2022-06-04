import { Prop, Schema } from '@nestjs/mongoose'
import { v4 as uuid } from 'uuid';
import { IDefaultPermission } from '../contracts/interface/default-permission.interface';

@Schema()
export class BaseEntity implements IDefaultPermission {
    @Prop({ required: true, type: String, default: uuid })
    _id: string

    @Prop({ required: true })
    tenantId?: string

    @Prop({ required: false, default: [] })
    rolesAllowedToEdit?: string[];

    @Prop({ required: false, default: [] })
    rolesAllowedToDelete?: string[];

    @Prop({ required: false, default: [] })
    rolesAllowedToAdd?: string[];

    @Prop({ required: false, default: [] })
    rolesAllowedToRead?: string[];

    @Prop({ required: false, default: false })
    isMarkedToDelete?: boolean;

}

