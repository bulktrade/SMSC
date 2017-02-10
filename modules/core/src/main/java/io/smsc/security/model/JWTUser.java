package io.smsc.security.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.smsc.model.Role;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

import static java.util.Objects.requireNonNull;

/**
 * Implementation of base {@link UserDetails} interface with {@link io.smsc.model.User}
 * information which is later encapsulated into {@link Authentication} objects.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
public class JWTUser implements UserDetails {

    private static final long serialVersionUID = 1L;

    private Long id;

    private final String username;

    private final String password;

    private final String salt;

    private final String firstName;

    private final String surName;

    private final String email;

    private final boolean active;

    private final Date created = new Date();

    private final boolean blocked;

    private final Set<Role> roles;

    private final Collection<? extends GrantedAuthority> authorities;

    public JWTUser(Long id, String username, String password, String salt, String firstName, String surName, String email, boolean active, boolean blocked, Set<Role> roles, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.salt = salt;
        this.firstName = firstName;
        this.surName = surName;
        this.email = email;
        this.active = active;
        this.blocked = blocked;
        this.roles = roles;
        this.authorities = authorities;
    }

    public Long getId() {
        return id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return blocked;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    public String getEmail() {
        return email;
    }

    public String getSalt() {
        return salt;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getSurName() {
        return surName;
    }

    public Date getCreated() {
        return created;
    }

    //enabling may cause a loop
    public Set<Role> getRoles() {
        return roles;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }

    private static JWTUser safeGet() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            return null;
        }
        Object principal = auth.getPrincipal();
        return (principal instanceof JWTUser) ? (JWTUser) principal : null;
    }

    public static JWTUser get() {
        JWTUser user = safeGet();
        requireNonNull(user, "No authorized user found");
        return user;
    }

    public static Long id() {
        return get().getId();
    }
}
