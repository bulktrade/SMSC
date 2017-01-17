package io.smsc.repository.role;

import io.smsc.model.Role;

/**
 * This interface is describing additional methods to extend {@link RoleRepository}.
 * Methods implementation is in {@link RoleRepositoryImpl}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
public interface RoleRepositoryCustom {

    Role addPermission(Long roleId, Long permissionId);

    Role removePermission(Long roleId, Long permissionId);
}
