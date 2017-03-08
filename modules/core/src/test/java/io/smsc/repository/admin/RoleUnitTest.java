package io.smsc.repository.admin;

import com.google.common.testing.EqualsTester;
import io.smsc.AbstractTest;
import io.smsc.model.admin.Role;
import io.smsc.model.admin.User;
import junit.framework.AssertionFailedError;
import org.junit.Before;
import org.junit.Test;

import java.util.Collections;

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
    public void testEqualsAndHashcodeSameRoles() throws Exception {
        new EqualsTester().addEqualityGroup(role1, role1)
                .addEqualityGroup(role1.hashCode(), role1.hashCode()).testEquals();
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualRoles() throws Exception {
        new EqualsTester().addEqualityGroup(role1, role2)
                .addEqualityGroup(role1.hashCode(), role2.hashCode()).testEquals();
    }

    @Test(expected = NullPointerException.class)
    public void testEqualsAndHashcodeRoleAndNull() throws Exception {
        new EqualsTester().addEqualityGroup(null, role1).testEquals();
    }

    @Test(expected = AssertionFailedError.class)
    public void testEqualsAndHashcodeRoleAndOtherObject() throws Exception {
        new EqualsTester().addEqualityGroup(role1, new User()).testEquals();
    }

    @Test(expected = AssertionFailedError.class)
    public void testEqualsAndHashcodePairOfNonEqualRoles() throws Exception {
        role2.setId(2L);
        new EqualsTester().addEqualityGroup(role1, role2).testEquals();
    }
}
