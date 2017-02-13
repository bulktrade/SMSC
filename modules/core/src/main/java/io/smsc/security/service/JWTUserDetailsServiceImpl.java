package io.smsc.security.service;

import io.smsc.model.User;
import io.smsc.repository.UserRepository;
import io.smsc.security.JWTUserFactory;
import io.smsc.security.model.JWTUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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
     * @throws UsernameNotFoundException if cannot locate a {@link User} by
     *                                   its username.
     */
    @Override
    public JWTUser loadUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
        } else {
            return JWTUserFactory.create(user);
        }
    }

    /**
     * Additional method which takes {@link User} entity by email from database and creates
     * {@link JWTUser} with appropriate parameters.
     *
     * @param email string which describes user's email
     * @return appropriate {@link JWTUser} object
     * @throws UsernameNotFoundException if cannot locate a {@link User} by
     *                                   its email.
     */
    @Override
    public JWTUser loadUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with email '%s'.", email));
        } else {
            return JWTUserFactory.create(user);
        }
    }
}
