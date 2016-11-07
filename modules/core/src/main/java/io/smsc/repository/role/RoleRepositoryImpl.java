package io.smsc.repository.role;

import io.smsc.model.Permission;
import io.smsc.model.Role;
import io.smsc.repository.permission.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Component
public class RoleRepositoryImpl implements RoleRepositoryCustom {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    public Role addPermission(Long roleId, Long permissionId){
        Role role = roleRepository.findOne(roleId);
        Permission permission = permissionRepository.findOne(permissionId);
        role.addPermission(permission);
        permission.addRole(role);
        permissionRepository.save(permission);
        return roleRepository.save(role);
    }

    public Role removePermission(Long roleId, Long permissionId){
        Role role = roleRepository.findOne(roleId);
        Permission permission = permissionRepository.findOne(permissionId);
        role.removePermission(permission);
        permission.removeRole(role);
        permissionRepository.save(permission);
        return roleRepository.save(role);
    }
}
