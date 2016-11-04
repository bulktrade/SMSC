package io.smsc.repository.user;

import io.smsc.model.Role;
import io.smsc.model.User;
import io.smsc.repository.role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl implements UserRepositoryCustom {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public User addRole(Long userId, Long roleId){
        User user = userRepository.findOne(userId);
        Role role = roleRepository.findOne(roleId);
        user.addRole(role);
        return userRepository.save(user);
    }

    public User removeRole(Long userId, Long roleId){
        User user = userRepository.findOne(userId);
        Role role = roleRepository.findOne(roleId);
        user.removeRole(role);
        return userRepository.save(user);
    }
}
