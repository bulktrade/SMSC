package io.smsc.jwt;

import io.smsc.jwt.model.JWTUser;
import io.smsc.jwt.service.impl.JWTUserDetailsServiceImpl;
import io.smsc.model.admin.Authority;
import io.smsc.model.admin.Group;
import io.smsc.model.admin.Role;
import io.smsc.model.admin.User;
import org.junit.Before;
import org.junit.Test;

import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;

public class JWTUserUnitTest {

    private User user;
    private Group group;

    @Before
    public void setUp() {
        user = new User();
        group = new Group();
        Role role = new Role();
        Authority authority = new Authority();
        role.setName("ROLE_ROLE");
        group.setName("GROUP_GROUP");
        authority.setName("AUTHORITY_AUTHORITY");
        user.setRoles(Collections.singleton(role));
        user.setAuthorities(Collections.singleton(authority));
        group.setAuthorities(Collections.singleton(authority));
        user.setGroups(Collections.singleton(group));
    }

    @Test
    public void createJWTUserWithGroupWithAuthority() {
        JWTUser jwtUser = JWTUserDetailsServiceImpl.createJwtUser(user);

        assertThat(jwtUser.getAuthorities()).hasSize(2);
    }

    @Test
    public void createJWTUserWithGroupWithoutAuthorities() {
        group.setAuthorities(Collections.emptySet());
        JWTUser jwtUser = JWTUserDetailsServiceImpl.createJwtUser(user);

        assertThat(jwtUser.getAuthorities()).hasSize(2);
    }

    @Test
    public void createJWTUserWithGroupWithNullAuthorities() {
        group.setAuthorities(null);
        JWTUser jwtUser = JWTUserDetailsServiceImpl.createJwtUser(user);

        assertThat(jwtUser.getAuthorities()).hasSize(2);
    }
}
