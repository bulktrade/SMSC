package io.smsc.repository.user;

import io.smsc.converters.CryptoConverter;
import io.smsc.model.Role;
import io.smsc.model.User;
import io.smsc.model.dashboard.Dashboard;
import io.smsc.repository.dashboard.dashboard.DashboardRepository;
import io.smsc.repository.role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;

/**
 * This class provides implementation of additional methods which are described in
 * {@link UserRepositoryCustom} to extend {@link UserRepository}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@Component
public class UserRepositoryImpl implements UserRepositoryCustom {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    /**
     * String, which is used for {@link org.springframework.security.crypto.encrypt.TextEncryptor} creating
     */
    @Value("${encrypt.key}")
    private String secretKey;

    /**
     * Method to add specific {@link io.smsc.model.Role} to specific {@link User}
     *
     * @param  userId      long value which identifies {@link User} in database
     * @param  roleId      long value which identifies {@link Role} in database
     * @return             updated {@link User} entity
     */
    @Override
    public User addRole(Long userId, Long roleId){
        User user = userRepository.findOne(userId);
        Role role = roleRepository.findOne(roleId);
        user.addRole(role);
        role.addUser(user);
        roleRepository.save(role);
        userRepository.save(user);
        return userRepository.getOneWithRolesAndDecryptedPassword(userId);
    }

    /**
     * Method to remove specific {@link io.smsc.model.Role} from specific {@link User}
     *
     * @param  userId      long value which identifies {@link User} in database
     * @param  roleId      long value which identifies {@link Role} in database
     * @return             updated {@link User} entity
     */
    @Override
    public User removeRole(Long userId, Long roleId){
        User user = userRepository.findOne(userId);
        Role role = roleRepository.findOne(roleId);
        user.removeRole(role);
        role.removeUser(user);
        roleRepository.save(role);
        userRepository.save(user);
        return userRepository.getOneWithRolesAndDecryptedPassword(userId);
    }


    @Override
    public User getOneWithDecryptedPassword(Long id){
        User user = userRepository.findOne(id);
        if(user == null) {
            return null;
        }
        CryptoConverter.decrypt(user,secretKey);
        return user;
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
    public User getOneWithRolesAndDecryptedPassword(Long id) {
        User user = userRepository.findOne(id);
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
    public User getOneByEmailWithDecryptedPassword(String email){
        User user = userRepository.findByEmail(email);
        if(user == null) {
            return null;
        }
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
    public User getOneByUserNameWithDecryptedPassword(String username){
        User user = userRepository.findByUsername(username);
        if(user == null) {
            return null;
        }
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
        List<User> users = userRepository.findAllDistinctByOrderById();
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
    public User saveOneWithEncryptedPassword(User user){
        CryptoConverter.encrypt(user,secretKey);
        return userRepository.save(user);
    }
}
