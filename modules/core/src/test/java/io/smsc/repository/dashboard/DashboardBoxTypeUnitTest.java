package io.smsc.repository.dashboard;

import com.google.common.testing.EqualsTester;
import io.smsc.AbstractTest;
import io.smsc.model.customer.Customer;
import io.smsc.model.dashboard.*;
import junit.framework.AssertionFailedError;
import org.junit.Before;
import org.junit.Test;

import java.util.Collections;

public class DashboardBoxTypeUnitTest extends AbstractTest {

    private DashboardBoxType dashboardBoxType1;
    private DashboardBoxType dashboardBoxType2;

    @Before
    public void initDashboardBoxTypes() throws Exception {
        this.dashboardBoxType1 = new DashboardBoxType();
        this.dashboardBoxType2 = new DashboardBoxType();
        dashboardBoxType1.setId(1L);
        dashboardBoxType1.setName("new dashboard box type");
        dashboardBoxType1.setType(Type.CHART);
        dashboardBoxType1.setKind(Kind.BAR_CHART);
        dashboardBoxType1.setDashboardBoxes(Collections.emptySet());
        dashboardBoxType2.setId(1L);
        dashboardBoxType2.setName("new dashboard box type");
        dashboardBoxType2.setType(Type.CHART);
        dashboardBoxType2.setKind(Kind.BAR_CHART);
        dashboardBoxType2.setDashboardBoxes(Collections.emptySet());
    }

    @Test
    public void testEqualsAndHashcodeSameDashboardBoxTypes() throws Exception {
        new EqualsTester().addEqualityGroup(dashboardBoxType1, dashboardBoxType1)
                .addEqualityGroup(dashboardBoxType1.hashCode(), dashboardBoxType1.hashCode()).testEquals();
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualDashboardBoxTypes() throws Exception {
        new EqualsTester().addEqualityGroup(dashboardBoxType1, dashboardBoxType2)
                .addEqualityGroup(dashboardBoxType1.hashCode(), dashboardBoxType2.hashCode()).testEquals();
    }

    @Test(expected = NullPointerException.class)
    public void testEqualsAndHashcodeDashboardBoxTypeAndNull() throws Exception {
        new EqualsTester().addEqualityGroup(null, dashboardBoxType1).testEquals();
    }

    @Test(expected = AssertionFailedError.class)
    public void testEqualsAndHashcodeDashboardBoxTypeAndOtherObject() throws Exception {
        new EqualsTester().addEqualityGroup(dashboardBoxType1, new Customer()).testEquals();
    }

    @Test(expected = AssertionFailedError.class)
    public void testEqualsAndHashcodePairOfNonEqualDashboardBoxTypes() throws Exception {
        dashboardBoxType2.setId(2L);
        new EqualsTester().addEqualityGroup(dashboardBoxType1, dashboardBoxType2).testEquals();
    }
}
