package io.smsc.rest.repository;

import io.smsc.model.Permission;
import io.smsc.model.Role;
import org.springframework.dao.support.DataAccessUtils;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public class PermissionRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public Permission save(Permission permission, int roleId) {
        permission.setRole(entityManager.getReference(Role.class, roleId));
        if (permission.isNew()) {
            entityManager.persist(permission);
            return permission;
        } else {
            return entityManager.merge(permission);
        }
    }

    @Transactional
    public void delete(int id, int roleId) {
        entityManager.createQuery("DELETE FROM Permission p WHERE p.id=:id AND p.role.id=:roleId")
                .setParameter("id", id)
                .setParameter("roleId", roleId)
                .executeUpdate();
    }

    public Permission get(int id, int roleId) {
        List<Permission> roles = entityManager.createQuery("SELECT p FROM Permission p WHERE p.id=:id AND p.role.id=:roleId", Permission.class)
                .setParameter("id", id)
                .setParameter("roleId", roleId)
                .getResultList();
        return DataAccessUtils.singleResult(roles);
    }

    public List<Permission> getAll(int roleId) {
        return entityManager.createQuery("SELECT p FROM Permission p WHERE p.role.id=:roleId", Permission.class)
                .setParameter("roleId", roleId)
                .getResultList();
    }
}
