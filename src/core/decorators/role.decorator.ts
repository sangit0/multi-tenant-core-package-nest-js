import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/role.guard';

export function Role(...roles: string[]) {
    return applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard));
}
