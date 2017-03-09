package io.smsc.repository.admin;

import io.smsc.AbstractTest;
import io.smsc.model.admin.Role;
import io.smsc.model.admin.User;
import org.junit.Before;
import org.junit.Test;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class RoleUnitTest extends AbstractTest {

    private Role role1;
    private Role role2;

    @Before
    public void initRoles() throws Exception {
        this.role1 = new Role();
        this.role2 = new Role();
        role1.setId(1L);
        role1.setName("ROLE_NEW");
        role1.setUsers(Collections.emptySet());
        role1.setUsers(Collections.emptySet());
        role2.setId(1L);
        role2.setName("ROLE_NEW");
        role1.setUsers(Collections.emptySet());
        role1.setUsers(Collections.emptySet());
    }

    @Test
    public void testEqualsAndHashcodeSameRole() throws Exception {
        assertThat(role1).isEqualTo(role1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualRoles() throws Exception {
        assertThat(role1).isEqualTo(role2);
    }

    @Test
    public void testEqualsAndHashcodeRoleAndNull() throws Exception {
        assertThat(role1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeRoleAndOtherObject() throws Exception {
        assertThat(role1).isNotEqualTo(new User());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualRoles() throws Exception {
        role2.setId(2L);
        assertThat(role1).isNotEqualTo(role2);
    }

    @Test
    public void testEqualsAndHashcodeEqualRoleInSet() throws Exception {
        Set<Role> set = new HashSet<>();
        set.add(role1);
        set.add(role2);
        assertThat(set.size()).isEqualTo(1);
    }
}
