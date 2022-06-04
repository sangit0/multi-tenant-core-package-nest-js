import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { IDefaultPermission } from '../contracts/interface/default-permission.interface';


export class DefaultPermission implements IDefaultPermission {

  @Prop({ required: false, default: [] })
  rolesAllowedToEdit: string[];

  @Prop({ required: false, default: [] })
  rolesAllowedToDelete: string[];

  @Prop({ required: false, default: [] })
  rolesAllowedToAdd: string[];

  @Prop({ required: false, default: [] })
  rolesAllowedToRead: string[];

  @Prop({ required: false, default: false })
  isMarkedToDelete: boolean;
}

export class ColumnLevelPermission {
  @Prop({ required: true })
  columnName: string

  @Prop({ required: true })
  roles: string[] //here all roles who needs permissions

}

@Schema({ collection: 'EntityColumnPermission' })
export class EntityColumnPermission {
  @Prop({ required: true, type: String, default: uuid })
  _id: string

  @Prop({ required: true })
  entityName: string

  @Prop({ required: true })
  defaultRowPermissions: DefaultPermission //here all roles who needs permissions

  @Prop({ required: true })
  columnLevelPermissions: ColumnLevelPermission[] //here all columns who needs permissions by role
}

export const EntityColumnPermissionSchema = SchemaFactory.createForClass(EntityColumnPermission)

export type EntityColumnPermissionDocument = EntityColumnPermission & Document
