package io.smsc.repository.admin;

import com.google.common.testing.EqualsTester;
import io.smsc.AbstractTest;
import io.smsc.model.admin.Group;
import io.smsc.model.admin.User;
import junit.framework.AssertionFailedError;
import org.junit.Before;
import org.junit.Test;

import java.util.Collections;

public class GroupUnitTest extends AbstractTest {

    private Group group1;
    private Group group2;

    @Before
    public void initGroups() throws Exception {
        this.group1 = new Group();
        this.group2 = new Group();
        group1.setId(1L);
        group1.setName("NEW_GROUP");
        group1.setUsers(Collections.emptySet());
        group1.setAuthorities(Collections.emptySet());
        group2.setId(1L);
        group2.setName("NEW_GROUP");
        group1.setUsers(Collections.emptySet());
        group1.setAuthorities(Collections.emptySet());
    }

    @Test
    public void testEqualsAndHashcodeSameGroups() throws Exception {
        new EqualsTester().addEqualityGroup(group1, group1)
                .addEqualityGroup(group1.hashCode(), group1.hashCode()).testEquals();
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualGroups() throws Exception {
        new EqualsTester().addEqualityGroup(group1, group2)
                .addEqualityGroup(group1.hashCode(), group2.hashCode()).testEquals();
    }

    @Test(expected = NullPointerException.class)
    public void testEqualsAndHashcodeGroupAndNull() throws Exception {
        new EqualsTester().addEqualityGroup(null, group1).testEquals();
    }

    @Test(expected = AssertionFailedError.class)
    public void testEqualsAndHashcodeGroupAndOtherObject() throws Exception {
        new EqualsTester().addEqualityGroup(group1, new User()).testEquals();
    }

    @Test(expected = AssertionFailedError.class)
    public void testEqualsAndHashcodePairOfNonEqualGroups() throws Exception {
        group2.setId(2L);
        new EqualsTester().addEqualityGroup(group1, group2).testEquals();
    }
}
