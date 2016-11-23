package io.smsc.repository.user;

import io.smsc.converters.CryptoConverter;
import io.smsc.model.Role;
import io.smsc.model.User;
import io.smsc.repository.role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserRepositoryImpl implements UserRepositoryCustom {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Value("${encrypt.key}")
    private String secretKey;

    public User addRole(Long userId, Long roleId){
        User user = userRepository.findOne(userId);
        Role role = roleRepository.findOne(roleId);
        user.addRole(role);
        role.addUser(user);
        roleRepository.save(role);
        return userRepository.save(user);
    }

    public User removeRole(Long userId, Long roleId){
        User user = userRepository.findOne(userId);
        Role role = roleRepository.findOne(roleId);
        user.removeRole(role);
        role.removeUser(user);
        roleRepository.save(role);
        return userRepository.save(user);
    }

    public User getOneWithDecryptedPassword(Long id){
        User user = userRepository.getOne(id);
        CryptoConverter.decrypt(user,secretKey);
        return user;
    }

    @Override
    public User getOneByEmailWithDecryptedPassword(String email) {
        User user = userRepository.findByEmail(email);
        CryptoConverter.decrypt(user,secretKey);
        return user;
    }

    @Override
    public User getOneByUserNameWithDecryptedPassword(String username) {
        User user = userRepository.findByUserName(username);
        CryptoConverter.decrypt(user,secretKey);
        return user;
    }

    @Override
    public List<User> getAllWithDecryptedPassword() {
        List<User> users = userRepository.findAll();
        users.forEach(user -> CryptoConverter.decrypt(user,secretKey));
        return users;
    }

    public User saveOneWithEncryptedPassword(User user){
        CryptoConverter.encrypt(user,secretKey);
        return userRepository.save(user);
    }
}
