package io.smsc.security.service;

import io.smsc.security.model.JWTUser;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 * This interface is extending basic {@link UserDetailsService} and describing methods
 * to locate the user based on the username or email.Methods implementation is in
 * {@link JWTUserDetailsServiceImpl}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */

public interface JWTUserDetailsService extends UserDetailsService {

    JWTUser loadUserByUsername(String username) throws UsernameNotFoundException;

    JWTUser loadUserByEmail(String email) throws UsernameNotFoundException;
}
