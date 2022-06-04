
/**
 *  Interfaces ensuring solid principles
 */

interface IColumnLevelPermission {
    columnName: string,
    roles: string[];

}
export interface IEntityColumnPermission {

    entityName: string;
    defaultRowPermissions: string[];
    columnLevelPermissions: IColumnLevelPermission[]
}