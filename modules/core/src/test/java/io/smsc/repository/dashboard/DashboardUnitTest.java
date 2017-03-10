package io.smsc.repository.dashboard;

import io.smsc.AbstractTest;
import io.smsc.model.admin.User;
import io.smsc.model.customer.Customer;
import io.smsc.model.dashboard.Dashboard;
import org.junit.Before;
import org.junit.Test;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

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
    public void testEqualsAndHashcodeSameDashboard() throws Exception {
        assertThat(dashboard1).isEqualTo(dashboard1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualDashboards() throws Exception {
        assertThat(dashboard1).isEqualTo(dashboard2);
    }

    @Test
    public void testEqualsAndHashcodeDashboardAndNull() throws Exception {
        assertThat(dashboard1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeDashboardAndOtherObject() throws Exception {
        assertThat(dashboard1).isNotEqualTo(new Customer());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualDashboards() throws Exception {
        dashboard2.setId(2L);
        assertThat(dashboard1).isNotEqualTo(dashboard2);
    }

    @Test
    public void testEqualsAndHashcodeEqualDashboardsInSet() throws Exception {
        Set<Dashboard> set = new HashSet<>();
        set.add(dashboard1);
        set.add(dashboard2);
        assertThat(set.size()).isEqualTo(1);
    }
}
