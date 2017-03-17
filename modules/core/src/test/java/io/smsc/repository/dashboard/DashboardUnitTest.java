package io.smsc.repository.dashboard;

import io.smsc.model.customer.Customer;
import io.smsc.model.dashboard.Dashboard;
import org.junit.Before;
import org.junit.Test;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class DashboardUnitTest {

    private Dashboard dashboard1;
    private Dashboard dashboard2;

    @Before
    public void initDashboards() throws Exception {
        this.dashboard1 = new Dashboard();
        this.dashboard2 = new Dashboard();
        dashboard1.setId(1L);
        dashboard1.setIcon("admin");
        dashboard1.setName("default_admin");
        dashboard1.setDashboardBoxes(Collections.emptySet());
        dashboard2.setId(1L);
        dashboard2.setIcon("admin");
        dashboard2.setName("default_admin");
        dashboard2.setDashboardBoxes(Collections.emptySet());
    }

    @Test
    public void testEqualsAndHashcodeSameDashboard() throws Exception {
        assertThat(dashboard1).isEqualTo(dashboard1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualDashboards() throws Exception {
        assertThat(dashboard1).isEqualTo(dashboard2);
        assertThat(dashboard1.getUser()).isEqualTo(dashboard2.getUser());
        assertThat(dashboard1.getDashboardBoxes()).isEqualTo(dashboard2.getDashboardBoxes());
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
    public void testEqualsAndHashcodePairOfNonEqualDashboards1() throws Exception {
        dashboard2.setId(2L);

        assertThat(dashboard1).isNotEqualTo(dashboard2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualDashboards2() throws Exception {
        dashboard2.setName("some name");

        assertThat(dashboard1).isNotEqualTo(dashboard2);
    }

    @Test
    public void testEqualsAndHashcodeEqualDashboardsInSet() throws Exception {
        Set<Dashboard> set = new HashSet<>();
        set.add(dashboard1);
        set.add(dashboard2);

        assertThat(set.size()).isEqualTo(1);
    }

    @Test
    public void testDashboardToString() throws Exception {
        assertThat(dashboard1.toString()).isEqualTo("{id = " + dashboard1.getId() +
                ", name = '" + dashboard1.getName() + '\'' +
                ", icon = '" + dashboard1.getIcon() + '\'' +
                ", version = " + dashboard1.getVersion() +
                ", lastModifiedDate = '" + dashboard1.getLastModifiedDate() + '\'' +
                "}");
    }
}
