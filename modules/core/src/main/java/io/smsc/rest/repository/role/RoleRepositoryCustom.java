package io.smsc.rest.repository.role;

import io.smsc.model.Role;

public interface RoleRepositoryCustom {

    Role addPermission(Long roleId, Long permissionId);
    Role removePermission(Long roleId, Long permissionId);
}
