package io.smsc.repository.user;

import io.smsc.converters.CryptoConverter;
import io.smsc.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

/**
 * This class provides implementation of additional methods which are described in
 * {@link UserRepositoryCustom} to extend {@link UserRepository}
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@Component
public class UserRepositoryImpl extends SimpleJpaRepository<User, Long> implements UserRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * String, which is used for {@link org.springframework.security.crypto.encrypt.TextEncryptor} creating
     */
    @Value("${encrypt.key}")
    private String secretKey;

    public UserRepositoryImpl(JpaEntityInformation<User, ?> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
    }

    public UserRepositoryImpl(Class<User> domainClass, EntityManager em) {
        super(domainClass, em);
    }

    /**
     * Method to find specific {@link User} with roles in database by id.
     * <p>
     * This method extends default
     * {@link UserRepository#findOne(Long)} method
     *
     * @param id long value which identifies {@link User} in database
     * @return {@link User} entity
     */
    @Override
    public User findOne(Long id) { // @should work like this, because of special logic in the jpa findOne. Do like this in your other custom methods. 
        User user;

        try {
            user = super.findOne(id);
            CryptoConverter.decrypt(user, secretKey);
        } catch (NoResultException ex) {
            return null;
        }

        return user;
    }

    /**
     * Method to find specific {@link User} in database by email address.
     * <p>
     * This method extends default
     * {@link UserRepository#findByEmail(String)} method
     *
     * @param email string which describes {@link User} email
     * @return {@link User} entity
     */
    @Override
    public User findByEmail(String email) {
        User user;
        try {
            TypedQuery query = entityManager.createQuery("select u from User u where u.email = ?1", User.class);
            query.setParameter(1, email);
            user = (User) query.getSingleResult();
            CryptoConverter.decrypt(user, secretKey);
        } catch (NoResultException ex) {
            return null;
        }
        return user;
    }

    /**
     * Method to find specific {@link User} in database by user name.
     * <p>
     * This method extends default
     * {@link UserRepository#findByUserName(String)} method
     *
     * @param username string which describes {@link User} name
     * @return {@link User} entity
     */
    @Override
    public User findByUserName(String username) {
        User user;
        try {
            TypedQuery query = entityManager.createQuery("select u from User u where u.username = ?1", User.class);
            query.setParameter(1, username);
            user = (User) query.getSingleResult();
            CryptoConverter.decrypt(user, secretKey);
        } catch (NoResultException ex) {
            return null;
        }
        return user;
    }

    /**
     * Method to get all {@link User} entities from database.
     * <p>
     * This method extends default {@link UserRepository#findAll()} method
     *
     * @return list with {@link User} entities
     */
    @Override
    public Page<User> findAll(Pageable pageable) {
        TypedQuery query = entityManager.createQuery("select u from User u", User.class);
        List<User> users = query.getResultList();
        users.forEach(user -> CryptoConverter.decrypt(user, secretKey));
        return new PageImpl<>(users);
    }

    /**
     * Method to create and save {@link User} in database.
     * <p>
     * This method extends default
     * {@link UserRepository#save(User)} method.
     *
     * @param user valid {@link User} entity
     * @return created {@link User} entity
     */
    @Override
    @Transactional
    public User save(User user) {
        CryptoConverter.encrypt(user, secretKey);
        if (user.isNew()) {
            entityManager.persist(user);
        } else {
            entityManager.merge(user);
        }
        return user;
    }
}
