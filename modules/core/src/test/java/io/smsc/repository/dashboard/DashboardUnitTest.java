package io.smsc.repository.dashboard;

import com.google.common.testing.EqualsTester;
import io.smsc.AbstractTest;
import io.smsc.model.admin.User;
import io.smsc.model.customer.Customer;
import io.smsc.model.dashboard.Dashboard;
import junit.framework.AssertionFailedError;
import org.junit.Before;
import org.junit.Test;

import java.util.Collections;

public class DashboardUnitTest extends AbstractTest {

    private Dashboard dashboard1;
    private Dashboard dashboard2;

    @Before
    public void initDashboards() throws Exception {
        this.dashboard1 = new Dashboard();
        this.dashboard2 = new Dashboard();
        dashboard1.setId(1L);
        dashboard1.setIcon("admin");
        dashboard1.setName("default_admin");
        dashboard1.setUser(new User());
        dashboard1.setDashboardBoxes(Collections.emptySet());
        dashboard2.setId(1L);
        dashboard2.setIcon("admin");
        dashboard2.setName("default_admin");
        dashboard2.setUser(new User());
        dashboard2.setDashboardBoxes(Collections.emptySet());
    }

    @Test
    public void testEqualsAndHashcodeSameDashboards() throws Exception {
        new EqualsTester().addEqualityGroup(dashboard1, dashboard1)
                .addEqualityGroup(dashboard1.hashCode(), dashboard1.hashCode()).testEquals();
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualDashboards() throws Exception {
        new EqualsTester().addEqualityGroup(dashboard1, dashboard2)
                .addEqualityGroup(dashboard1.hashCode(), dashboard2.hashCode()).testEquals();
    }

    @Test(expected = NullPointerException.class)
    public void testEqualsAndHashcodeDashboardAndNull() throws Exception {
        new EqualsTester().addEqualityGroup(null, dashboard1).testEquals();
    }

    @Test(expected = AssertionFailedError.class)
    public void testEqualsAndHashcodeDashboardAndOtherObject() throws Exception {
        new EqualsTester().addEqualityGroup(dashboard1, new Customer()).testEquals();
    }

    @Test(expected = AssertionFailedError.class)
    public void testEqualsAndHashcodePairOfNonEqualDashboards() throws Exception {
        dashboard2.setId(2L);
        new EqualsTester().addEqualityGroup(dashboard1, dashboard2).testEquals();
    }
}
