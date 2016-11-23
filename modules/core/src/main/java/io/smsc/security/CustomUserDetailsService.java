package io.smsc.security;

import io.smsc.model.Permission;
import io.smsc.model.Role;
import io.smsc.model.User;
import io.smsc.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service("userDetailsService")
@Transactional
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public CustomUserDetailsService() {
        super();
    }

    @Override
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
            try {
            final User user = userRepository.getOneByUserNameWithDecryptedPassword(username);
            if (user == null) {
                throw new UsernameNotFoundException("No user found with username: " + username);
            }

            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.isActive(), true, true, !user.isBlocked(), getAuthorities(user.getRoles()));
        } catch (final Exception e) {
            throw new RuntimeException(e);
        }
    }

    public UserDetails loadUserByEmail(final String email) throws UsernameNotFoundException {
        try {
            final User user = userRepository.getOneByEmailWithDecryptedPassword(email);
            if (user == null) {
                throw new UsernameNotFoundException("No user found with email: " + email);
            }

            return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), user.isActive(), true, true, !user.isBlocked(), getAuthorities(user.getRoles()));
        } catch (final Exception e) {
            throw new RuntimeException(e);
        }
    }

    private Collection<? extends GrantedAuthority> getAuthorities(final Collection<Role> roles) {
        return getGrantedAuthorities(getPermissions(roles));
    }

    private List<String> getPermissions(final Collection<Role> roles) {
        final List<String> permissions = new ArrayList<>();
        final List<Permission> collection = new ArrayList<>();
        for (final Role role : roles) {
            collection.addAll(role.getPermissions());
        }
        permissions.addAll(collection.stream().map(Permission::getName).collect(Collectors.toList()));
        return permissions;
    }

    private List<GrantedAuthority> getGrantedAuthorities(final List<String> permissions) {
        final List<GrantedAuthority> authorities = new ArrayList<>();
        for (final String permission : permissions) {
            authorities.add(new SimpleGrantedAuthority(permission));
        }
        return authorities;
    }
}
