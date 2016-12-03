package io.smsc.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;

public class JWTUser implements UserDetails {

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

    private final Collection<? extends GrantedAuthority> authorities;

    public JWTUser(Long id, String username, String password, String salt, String firstName, String surName, String email, boolean active, boolean blocked, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.salt = salt;
        this.firstName = firstName;
        this.surName = surName;
        this.email = email;
        this.active = active;
        this.blocked = blocked;
        this.authorities = authorities;
    }

    @JsonIgnore
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

    @JsonIgnore
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



}
