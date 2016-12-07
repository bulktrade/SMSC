package io.smsc.security;

import io.smsc.model.Permission;
import io.smsc.model.Role;
import io.smsc.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.*;
import java.util.stream.Collectors;

public final class JWTUserFactory {

    private JWTUserFactory() {
    }

    public static JWTUser create(User user) {
        return new JWTUser(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getSalt(),
                user.getFirstName(),
                user.getSurName(),
                user.getEmail(),
                user.isActive(),
                user.isBlocked(),
                user.getRoles(),
                mapToGrantedAuthorities(user.getRoles())
        );
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(List<Role> roles) {
        return getGrantedAuthorities(getPermissions(roles));
    }

    private static Set<String> getPermissions(Collection<Role> roles) {
        final Set<String> authorities = new HashSet<>();
        final List<Permission> collection = new ArrayList<>();
        for (final Role role : roles) {
            collection.addAll(role.getPermissions());
        }
        authorities.addAll(collection.stream().map(Permission::getName).collect(Collectors.toList()));
        return authorities;
    }

    private static List<GrantedAuthority> getGrantedAuthorities(Set<String> permissions) {
        final List<GrantedAuthority> authorities = new ArrayList<>();
        for (final String authority : permissions) {
            authorities.add(new SimpleGrantedAuthority(authority));
        }
        return authorities;
    }
}
