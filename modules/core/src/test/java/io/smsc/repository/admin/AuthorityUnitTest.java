package io.smsc.repository.admin;

import io.smsc.AbstractTest;
import io.smsc.model.admin.Authority;
import io.smsc.model.admin.User;
import junit.framework.AssertionFailedError;
import org.junit.Before;
import org.junit.Test;

import com.google.common.testing.EqualsTester;

import java.util.Collections;

public class AuthorityUnitTest extends AbstractTest {

    private Authority authority1;
    private Authority authority2;

    @Before
    public void initAuthorities() throws Exception {
        this.authority1 = new Authority();
        this.authority2 = new Authority();
        authority1.setId(1L);
        authority1.setName("NEW_AUTHORITY");
        authority1.setUsers(Collections.emptySet());
        authority1.setGroups(Collections.emptySet());
        authority2.setId(1L);
        authority2.setName("NEW_AUTHORITY");
        authority1.setUsers(Collections.emptySet());
        authority1.setGroups(Collections.emptySet());
    }

    @Test
    public void testEqualsAndHashcodeSameAuthority() throws Exception {
        new EqualsTester().addEqualityGroup(authority1, authority1)
                .addEqualityGroup(authority1.hashCode(), authority1.hashCode()).testEquals();
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualAuthorities() throws Exception {
        new EqualsTester().addEqualityGroup(authority1, authority2)
                .addEqualityGroup(authority1.hashCode(), authority2.hashCode()).testEquals();
    }

    @Test(expected = NullPointerException.class)
    public void testEqualsAndHashcodeAuthorityAndNull() throws Exception {
        new EqualsTester().addEqualityGroup(null, authority1).testEquals();
    }

    @Test(expected = AssertionFailedError.class)
    public void testEqualsAndHashcodeAuthorityAndOtherObject() throws Exception {
        new EqualsTester().addEqualityGroup(authority1, new User()).testEquals();
    }

    @Test(expected = AssertionFailedError.class)
    public void testEqualsAndHashcodePairOfNonEqualAuthorities() throws Exception {
        authority2.setId(2L);
        new EqualsTester().addEqualityGroup(authority1, authority2).testEquals();
    }
}
