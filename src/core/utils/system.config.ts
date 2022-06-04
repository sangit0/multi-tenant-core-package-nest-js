

export const TENANT_OWN_DB_CONNECTION = "TENANT_OWN_DB_CONNECTION"
export const TENANT_REGISTERED_DB_CONNECTION = "TENANT_REGISTERED_DB_CONNECTION"
export const TENANT_CONTEXT = "TENANT_CONTEXT"
export const USER_CONTEXT = "USER_CONTEXT"

export const USER_MODEL_NAME = "Users"


export const SWAGGER_API_DOC_URL = "api/docs"


export const DefaultGuestName = "Guest";
export const DefaultGuestRole = "guest";
export const DefaultApplicationRole = "app_user";


export const entityTypesToExclude = ["Users", "users", "Role", "Roles", "EntityColumnPermissions"];

export const DefaultRoles = {
    DefaultGuestRole: DefaultGuestRole,
    DefaultApplicationRole: DefaultApplicationRole
}

export const getHostNameRegex = (url) => {
    // run against regex
    const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    // extract hostname (will be null if no match is found)
    return matches && matches[1].replace(/\:[^:]+$/, '') || url.replace(/\:[^:]+$/, '');
}

