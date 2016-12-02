package io.smsc.db.migration;

import io.smsc.model.Permission;
import io.smsc.model.Role;
import io.smsc.model.User;
import io.smsc.repository.permission.PermissionRepository;
import io.smsc.repository.role.RoleRepository;
import io.smsc.repository.user.UserRepository;
import org.springframework.stereotype.Component;

@Component
public class PopulateDB {

    private static UserRepository userRepository;

    private static RoleRepository roleRepository;

    private static PermissionRepository permissionRepository;

    public PopulateDB(UserRepository userRepository, RoleRepository roleRepository, PermissionRepository permissionRepository) {
        PopulateDB.userRepository = userRepository;
        PopulateDB.roleRepository = roleRepository;
        PopulateDB.permissionRepository = permissionRepository;
    }

    public static User saveUser(User user) {
        return userRepository.saveOneWithEncryptedPassword(user);
    }

    public static Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    public static Permission savePermission(Permission permission) {
        return permissionRepository.save(permission);
    }
}
