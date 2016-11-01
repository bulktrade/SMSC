package io.smsc.rest.repository;

import io.smsc.model.Role;
import io.smsc.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public class UserRepositoryImpl {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public boolean delete(long id) {
        return userRepository.deleteById(id) != 0;
    }


    public User save(User user){
        return userRepository.save(user);
    }


    public User get(long id){
        return userRepository.findOne(id);
    }


    public User getByEmail(String email){
        return userRepository.findByEmail(email);
    }


    public Collection<User> getAll(){
        return userRepository.findAll();
    }

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
