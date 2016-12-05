package io.smsc.repository.role;

import io.smsc.model.Role;

import java.util.Set;

public interface RoleRepositoryCustom {

    Role addPermission(Long roleId, Long permissionId);
    Role removePermission(Long roleId, Long permissionId);

    Set<Role> findAllDistinct();
}
