package io.smsc.rest.repository;

import io.smsc.model.Role;
import io.smsc.model.User;
import org.springframework.dao.support.DataAccessUtils;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public class RoleRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public Role save(Role role, int userId) {
        role.setUser(entityManager.getReference(User.class, userId));
        if (role.isNew()) {
            entityManager.persist(role);
            return role;
        } else {
            return entityManager.merge(role);
        }
    }

    @Transactional
    public void delete(int id, int userId) {
        entityManager.createQuery("DELETE FROM Role r WHERE r.id=:id AND r.user.id=:userId")
                .setParameter("id", id)
                .setParameter("userId", userId)
                .executeUpdate();
    }

    public Role get(int id, int userId) {
        List<Role> roles = entityManager.createQuery("SELECT r FROM Role r WHERE r.id=:id AND r.user.id=:userId", Role.class)
                .setParameter("id", id)
                .setParameter("userId", userId)
                .getResultList();
        return DataAccessUtils.singleResult(roles);
    }

    public List<Role> getAll(int userId) {
        return entityManager.createQuery("SELECT r FROM Role r WHERE r.user.id=:userId", Role.class)
                .setParameter("userId", userId)
                .getResultList();
    }
}
