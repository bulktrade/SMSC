package io.smsc.repository.role;

import io.smsc.model.Permission;
import io.smsc.model.Role;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.Serializable;

/**
 * This class provides implementation of additional methods which are described in
 * {@link RoleRepositoryCustom} to extend {@link RoleRepository}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
public class RoleRepositoryImpl implements RoleRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Method to add specific {@link Permission} to specific {@link Role}
     *
     * @param  roleId       long value which identifies {@link Role} in database
     * @param  permissionId long value which identifies {@link Permission} in database
     * @return              updated {@link Role} entity
     */
    @Override
    public Role addPermission(Long roleId, Long permissionId){
        Role role = entityManager.find(Role.class, roleId);
        Permission permission = entityManager.find(Permission.class, permissionId);
        role.addPermission(permission);
        permission.addRole(role);
        entityManager.merge(permission);
        return entityManager.merge(role);
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
        Role role = entityManager.find(Role.class, roleId);
        Permission permission = entityManager.find(Permission.class, permissionId);
        role.removePermission(permission);
        permission.removeRole(role);
        entityManager.merge(permission);
        return entityManager.merge(role);
    }
}
