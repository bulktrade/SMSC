package io.smsc.rest.repository;

import io.smsc.model.User;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public class UserRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public User save(User user) {
        if (user.isNew()) {
            entityManager.persist(user);
            return user;
        } else {
            return entityManager.merge(user);
        }
    }

    public User get(int id) {
        return entityManager.find(User.class, id);
    }

    @Transactional
    public void delete(int id) {
        entityManager.createQuery("DELETE FROM User u WHERE u.id=:id").setParameter("id", id).executeUpdate();
    }

    public List<User> getAll() {
        return entityManager.createQuery("SELECT u FROM User u", User.class).getResultList();
    }

}
