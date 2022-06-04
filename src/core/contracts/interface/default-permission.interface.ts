export interface IDefaultPermission {
    rolesAllowedToEdit?: string[];
    rolesAllowedToDelete?: string[]
    rolesAllowedToAdd?: string[];
    rolesAllowedToRead?: string[];
    isMarkedToDelete?: boolean;
}