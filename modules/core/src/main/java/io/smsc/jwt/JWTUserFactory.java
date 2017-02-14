package io.smsc.jwt;

import io.smsc.model.Role;
import io.smsc.model.admin.User;
import io.smsc.jwt.model.JWTUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Util class for creating {@link JWTUser} objects from {@link User} entities.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
public final class JWTUserFactory {

    private JWTUserFactory() {
    }

    /**
     * Base method which creates {@link JWTUser} objects
     *
     * @param user {@link User} entity which is user for {@link JWTUser} creating
     * @return appropriate {@link JWTUser} object
     */
    public static JWTUser create(User user) {
        return new JWTUser(user, mapToGrantedAuthorities(user.getRoles()));
    }

    /**
     * Base method which is used for creating set with {@link GrantedAuthority} from
     * set with {@link Role}
     *
     * @param roles set with {@link Role} entities
     * @return appropriate set with {@link GrantedAuthority} objects
     */
    private static Set<GrantedAuthority> mapToGrantedAuthorities(Set<Role> roles) {
        final Set<String> authorities = new HashSet<>();
        final Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        authorities.addAll(roles.stream().map(Role::getName).collect(Collectors.toList()));
        for (final String authority : authorities) {
            grantedAuthorities.add(new SimpleGrantedAuthority(authority));
        }
        return grantedAuthorities;
    }
}
