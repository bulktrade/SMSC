package io.smsc.repository.user;

import io.smsc.converters.CryptoConverter;
import io.smsc.model.Role;
import io.smsc.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.io.Serializable;
import java.util.List;

/**
 * This class provides implementation of additional methods which are described in
 * {@link UserRepositoryCustom} to extend {@link UserRepository}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
public class UserRepositoryImpl<T, ID extends Serializable> extends SimpleJpaRepository<T, ID> implements UserRepositoryCustom<T ,ID>  {

    private final EntityManager entityManager;

    /**
     * String, which is used for {@link org.springframework.security.crypto.encrypt.TextEncryptor} creating
     */
    @Value("${encrypt.key}")
    private String secretKey;

    public UserRepositoryImpl(JpaEntityInformation entityInformation, EntityManager em) {
        super(entityInformation, em);
        this.entityManager = em;
    }

    /**
     * Method to add specific {@link io.smsc.model.Role} to specific {@link User}
     *
     * @param  userId      long value which identifies {@link User} in database
     * @param  roleId      long value which identifies {@link Role} in database
     * @return             updated {@link User} entity
     */
    @Override
    public User addRole(ID userId, ID roleId) {
        User user = entityManager.find(User.class,userId);
        Role role = entityManager.find(Role.class,roleId);
        user.addRole(role);
        role.addUser(user);
        entityManager.merge(role);
        return entityManager.merge(user);
    }

    /**
     * Method to remove specific {@link io.smsc.model.Role} from specific {@link User}
     *
     * @param  userId      long value which identifies {@link User} in database
     * @param  roleId      long value which identifies {@link Role} in database
     * @return             updated {@link User} entity
     */
    @Override
    public User removeRole(ID userId, ID roleId) {
        User user = entityManager.find(User.class,userId);
        Role role = entityManager.find(Role.class,roleId);
        user.removeRole(role);
        role.removeUser(user);
        entityManager.merge(role);
        return entityManager.merge(user);
    }

    /**
     * Method to find specific {@link User} in database by id.
     * <p>
     * This method extends default
     * {@link UserRepository#findOne(Long)} method
     *
     * @param  id  long value which identifies {@link User} in database
     * @return     {@link User} entity
     */
    @Override
    public User getOneWithDecryptedPassword(ID id) {
        User user = entityManager.find(User.class,id);
        if(user == null) {
            return null;
        }
        CryptoConverter.decrypt(user,secretKey);
        return user;
    }

    /**
     * Method to find specific {@link User} with roles in database by id.
     * <p>
     * This method extends default
     * {@link UserRepository#findOne(Long)} method
     *
     * @param  id  long value which identifies {@link User} in database
     * @return     {@link User} entity
     */
    @Override
    public User getOneWithRolesAndDecryptedPassword(ID id) {
        User user = entityManager.find(User.class,id);
        if(user == null) {
            return null;
        }
        CryptoConverter.decrypt(user,secretKey);
        return user;
    }

        /**
     * Method to find specific {@link User} in database by email address.
     * <p>
     * This method extends default
     * {@link UserRepository#findByEmail(String)} method
     *
     * @param  email  string which describes {@link User} email
     * @return        {@link User} entity
     */
    @Override
    public User getOneByEmailWithDecryptedPassword(String email) {
//        User user = entityManager.find(User.class,email);
//        if(user == null) {
//            return null;
//        }
//        CryptoConverter.decrypt(user,secretKey);
//        return user;

        TypedQuery query = entityManager.createQuery("select u from User u where u.email = ?1", User.class);
        query.setParameter(1, email);
        User user = (User) query.getSingleResult();
        CryptoConverter.decrypt(user,secretKey);
        return user;
    }

    /**
     * Method to find specific {@link User} in database by user name.
     * <p>
     * This method extends default
     * {@link UserRepository#findByUsername(String)} method
     *
     * @param  username  string which describes {@link User} name
     * @return           {@link User} entity
     */
    @Override
    public User getOneByUserNameWithDecryptedPassword(String username) {
//        User user = entityManager.find(User.class,username);
//        if(user == null) {
//            return null;
//        }
//        CryptoConverter.decrypt(user,secretKey);
//        return user;

        TypedQuery query = entityManager.createQuery("select u from User u where u.username = ?1", User.class);
        query.setParameter(1, username);
        User user = (User) query.getSingleResult();
        CryptoConverter.decrypt(user,secretKey);
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
    public List<User> getAllWithRolesAndDecryptedPassword() {
        TypedQuery query = entityManager.createQuery("select u from User u join fetch u.roles,u.dashboards", User.class);
        List<User> users = query.getResultList();
        users.forEach(user -> CryptoConverter.decrypt(user,secretKey));
        return users;
    }

    /**
     * Method to create and save {@link User} in database.
     * <p>
     * This method extends default
     * {@link UserRepository#save(User)} method.
     *
     * @param  user  valid {@link User} entity
     * @return       created {@link User} entity
     */
    @Override
    public User saveOneWithEncryptedPassword(User user) {
        CryptoConverter.encrypt(user,secretKey);
        entityManager.persist(user);
        CryptoConverter.decrypt(user,secretKey);
        return user;
    }
}
