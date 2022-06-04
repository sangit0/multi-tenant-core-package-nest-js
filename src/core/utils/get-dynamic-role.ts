const DYNAMIC_USER_ROLE_PREFIX = "owner";


export function getUserDynamicRole(_id): string {
    return `${DYNAMIC_USER_ROLE_PREFIX}_${_id}`;
}