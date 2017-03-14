package io.smsc.jwt;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.jwt.model.JWTUser;
import io.smsc.model.admin.User;
import org.junit.Test;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Collections;
import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

public class JWTUserTest extends AbstractSpringMVCTest {

    @Test
    public void testLoadAdminUserByUsernameAndCreateJWTUser() throws Exception {
        User admin = userRepository.findByUsername("admin");
        JWTUser jwtUser = jwtUserDetailsService.loadUserByUsername("admin");
        assertThat(jwtUser.getId()).isEqualTo(2);
        assertThat(jwtUser.getUsername()).isEqualTo("admin");
        assertThat(jwtUser.isAccountNonExpired()).isEqualTo(true);
        assertThat(jwtUser.isAccountNonLocked()).isEqualTo(true);
        assertThat(jwtUser.isCredentialsNonExpired()).isEqualTo(true);
        assertThat(jwtUser.getEmail()).isEqualTo("admin@gmail.com");
        assertThat(jwtUser.getFirstName()).isEqualTo("adminName");
        assertThat(jwtUser.getSurName()).isEqualTo("adminSurname");
        assertThat(jwtUser.getCreated().getDate()).isEqualTo(admin.getCreated().getDate());
        assertThat(jwtUser.getPassword()).isEqualTo(admin.getPassword());
        assertThat(jwtUser.isEnabled()).isEqualTo(admin.isActive());
    }

    @Test
    public void testLoadAdminUserByEmailAndCreateJWTUser() throws Exception {
        User admin = userRepository.findByUsername("admin");
        JWTUser jwtUser = jwtUserDetailsService.loadUserByEmail("admin@gmail.com");
        assertThat(jwtUser.getId()).isEqualTo(2);
        assertThat(jwtUser.getUsername()).isEqualTo("admin");
        assertThat(jwtUser.isAccountNonExpired()).isEqualTo(true);
        assertThat(jwtUser.isAccountNonLocked()).isEqualTo(true);
        assertThat(jwtUser.isCredentialsNonExpired()).isEqualTo(true);
        assertThat(jwtUser.getEmail()).isEqualTo("admin@gmail.com");
        assertThat(jwtUser.getFirstName()).isEqualTo("adminName");
        assertThat(jwtUser.getSurName()).isEqualTo("adminSurname");
        assertThat(jwtUser.getCreated().getDate()).isEqualTo(admin.getCreated().getDate());
        assertThat(jwtUser.getPassword()).isEqualTo(admin.getPassword());
        assertThat(jwtUser.isEnabled()).isEqualTo(admin.isActive());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"POWER_ADMIN_USER"})
    public void testCreateJWTUserWithoutRights() throws Exception {
        User user = userRepository.findByUsername("user");
        user.setVersion(2L);
        user.setLastModifiedDate(new Date());
        user.setGroups(Collections.emptySet());
        user.setAuthorities(Collections.emptySet());
        user.setRoles(Collections.emptySet());
        userRepository.save(user);
        JWTUser jwtUser = jwtUserDetailsService.loadUserByUsername("user");
        assertThat(jwtUser.getAuthorities()).isEqualTo(Collections.emptySet());
    }

    @Test(expected = UsernameNotFoundException.class)
    public void testLoadNotExistedUserByEmail() throws Exception {
        jwtUserDetailsService.loadUserByEmail("fake@gmail.com");
    }
}
