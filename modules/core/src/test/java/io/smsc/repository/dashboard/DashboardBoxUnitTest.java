package io.smsc.repository.dashboard;

import com.google.common.testing.EqualsTester;
import io.smsc.AbstractTest;
import io.smsc.model.customer.Customer;
import io.smsc.model.dashboard.*;
import junit.framework.AssertionFailedError;
import org.junit.Before;
import org.junit.Test;

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
    public void testEqualsAndHashcodeSameDashboardBoxes() throws Exception {
        new EqualsTester().addEqualityGroup(dashboardBox1, dashboardBox1)
                .addEqualityGroup(dashboardBox1.hashCode(), dashboardBox1.hashCode()).testEquals();
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualDashboardBoxes() throws Exception {
        new EqualsTester().addEqualityGroup(dashboardBox1, dashboardBox2)
                .addEqualityGroup(dashboardBox1.hashCode(), dashboardBox2.hashCode()).testEquals();
    }

    @Test(expected = NullPointerException.class)
    public void testEqualsAndHashcodeDashboardBoxAndNull() throws Exception {
        new EqualsTester().addEqualityGroup(null, dashboardBox1).testEquals();
    }

    @Test(expected = AssertionFailedError.class)
    public void testEqualsAndHashcodeDashboardBoxAndOtherObject() throws Exception {
        new EqualsTester().addEqualityGroup(dashboardBox1, new Customer()).testEquals();
    }

    @Test(expected = AssertionFailedError.class)
    public void testEqualsAndHashcodePairOfNonEqualDashboardBoxes() throws Exception {
        dashboardBox2.setId(2L);
        new EqualsTester().addEqualityGroup(dashboardBox1, dashboardBox2).testEquals();
    }
}
