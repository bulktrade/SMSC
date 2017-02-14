package io.smsc.jwt.service;

import io.smsc.jwt.model.JWTUser;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * This interface is extending basic {@link UserDetailsService} and describing methods
 * to locate the user based on the username or email.Methods implementation is in
 * {@link JWTUserDetailsServiceImpl}
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */

public interface JWTUserDetailsService extends UserDetailsService {

    @Override
    JWTUser loadUserByUsername(String username);

    JWTUser loadUserByEmail(String email);
}
