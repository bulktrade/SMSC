package io.smsc.jwt.service;

import io.smsc.model.admin.Group;
import io.smsc.model.admin.User;
import io.smsc.repository.admin.UserRepository;
import io.smsc.jwt.model.JWTUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

/**
 * Implementation of base {@link JWTUserDetailsService} which loads user-specific data.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@Service
public class JWTUserDetailsServiceImpl implements JWTUserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public JWTUserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Implementation of basic {@link UserDetailsService#loadUserByUsername(String)} method
     * which takes {@link User} entity by username from database and creates {@link JWTUser} with
     * appropriate parameters.
     *
     * @param username string which describes user name
     * @return appropriate {@link JWTUser} object
     */
    @Override
    public JWTUser loadUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
        } else {
            return createJwtUser(user);
        }
    }

    /**
     * Additional method which takes {@link User} entity by email from database and creates
     * {@link JWTUser} with appropriate parameters.
     *
     * @param email string which describes user's email
     * @return appropriate {@link JWTUser} object
     */
    @Override
    public JWTUser loadUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with email '%s'.", email));
        } else {
            return createJwtUser(user);
        }
    }

    /**
     * Method to create set with {@link SimpleGrantedAuthority} for logged user. Authorities
     * are created from user's {@link io.smsc.model.acl.AclSid} and his {@link Group} sid's.
     *
     * @param user logged {@link User}
     * @return appropriate {@link JWTUser} object
     */
    public static JWTUser createJwtUser(User user) {
        Set<GrantedAuthority> authorities = new HashSet<>();
        if(null != user.getAclSid()) {
            authorities.add(new SimpleGrantedAuthority(user.getAclSid().getSid()));
        }
        if(null != user.getGroups() && !user.getGroups().isEmpty()) {
            for(Group group : user.getGroups()){
                if(null != group.getAclSid()) {
                    authorities.add(new SimpleGrantedAuthority(group.getAclSid().getSid()));
                }
            }
        }
        return new JWTUser(user, authorities);
    }
}
