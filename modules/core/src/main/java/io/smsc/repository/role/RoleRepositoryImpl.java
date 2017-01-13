package io.smsc.repository.role;

import io.smsc.model.Permission;
import io.smsc.model.Role;
import io.smsc.repository.permission.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * This class provides implementation of additional methods which are described in
 * {@link RoleRepositoryCustom} to extend {@link RoleRepository}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@Component
public class RoleRepositoryImpl implements RoleRepositoryCustom {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    /**
     * Method to add specific {@link Permission} to specific {@link Role}
     *
     * @param  roleId       long value which identifies {@link Role} in database
     * @param  permissionId long value which identifies {@link Permission} in database
     * @return              updated {@link Role} entity
     */
    @Override
    public Role addPermission(Long roleId, Long permissionId){
        Role role = roleRepository.findOne(roleId);
        Permission permission = permissionRepository.findOne(permissionId);
        role.addPermission(permission);
        permission.addRole(role);
        permissionRepository.save(permission);
        return roleRepository.save(role);
    }

    /**
     * Method to remove specific {@link Permission} from specific {@link Role}
     *
     * @param  roleId       long value which identifies {@link Role} in database
     * @param  permissionId long value which identifies {@link Permission} in database
     * @return              updated {@link Role} entity
     */
    @Override
    public Role removePermission(Long roleId, Long permissionId){
        Role role = roleRepository.findOne(roleId);
        Permission permission = permissionRepository.findOne(permissionId);
        role.removePermission(permission);
        permission.removeRole(role);
        permissionRepository.save(permission);
        return roleRepository.save(role);
    }
}
