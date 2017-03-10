package io.smsc.repository.dashboard;

import io.smsc.AbstractTest;
import io.smsc.model.customer.Customer;
import io.smsc.model.dashboard.*;
import org.junit.Before;
import org.junit.Test;

import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class DashboardBoxUnitTest extends AbstractTest {

    private DashboardBox dashboardBox1;
    private DashboardBox dashboardBox2;

    @Before
    public void initDashboardBoxes() throws Exception {
        this.dashboardBox1 = new DashboardBox();
        this.dashboardBox2 = new DashboardBox();
        dashboardBox1.setId(1L);
        dashboardBox1.setName("new box");
        dashboardBox1.setOrder(99);
        dashboardBox1.setWidth(Width.WIDTH_100);
        dashboardBox1.setHeight(Height.HEIGHT_100);
        dashboardBox1.setDescription("new box desc");
        dashboardBox1.setDashboardBoxType(new DashboardBoxType());
        dashboardBox1.setDashboard(new Dashboard());
        dashboardBox2.setId(1L);
        dashboardBox2.setName("new box");
        dashboardBox2.setOrder(99);
        dashboardBox2.setWidth(Width.WIDTH_100);
        dashboardBox2.setHeight(Height.HEIGHT_100);
        dashboardBox2.setDescription("new box desc");
        dashboardBox2.setDashboardBoxType(new DashboardBoxType());
        dashboardBox2.setDashboard(new Dashboard());
    }

    @Test
    public void testEqualsAndHashcodeSameDashboardBox() throws Exception {
        assertThat(dashboardBox1).isEqualTo(dashboardBox1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualDashboardBoxes() throws Exception {
        assertThat(dashboardBox1).isEqualTo(dashboardBox2);
    }

    @Test
    public void testEqualsAndHashcodeDashboardBoxAndNull() throws Exception {
        assertThat(dashboardBox1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeDashboardBoxAndOtherObject() throws Exception {
        assertThat(dashboardBox1).isNotEqualTo(new Customer());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualDashboardBoxes() throws Exception {
        dashboardBox2.setId(2L);
        assertThat(dashboardBox1).isNotEqualTo(dashboardBox2);
    }

    @Test
    public void testEqualsAndHashcodeEqualDashboardBoxesInSet() throws Exception {
        Set<DashboardBox> set = new HashSet<>();
        set.add(dashboardBox1);
        set.add(dashboardBox2);
        assertThat(set.size()).isEqualTo(1);
    }
}
