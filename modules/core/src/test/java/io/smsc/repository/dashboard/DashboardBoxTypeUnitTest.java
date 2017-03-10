package io.smsc.repository.dashboard;

import io.smsc.AbstractTest;
import io.smsc.model.customer.Customer;
import io.smsc.model.dashboard.*;
import org.junit.Before;
import org.junit.Test;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

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
    public void testEqualsAndHashcodeSameDashboardBoxType() throws Exception {
        assertThat(dashboardBoxType1).isEqualTo(dashboardBoxType1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualDashboardBoxTypes() throws Exception {
        assertThat(dashboardBoxType1).isEqualTo(dashboardBoxType2);
    }

    @Test
    public void testEqualsAndHashcodeDashboardBoxTypeAndNull() throws Exception {
        assertThat(dashboardBoxType1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeDashboardBoxTypeAndOtherObject() throws Exception {
        assertThat(dashboardBoxType1).isNotEqualTo(new Customer());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualDashboardBoxTypes() throws Exception {
        dashboardBoxType2.setId(2L);
        assertThat(dashboardBoxType1).isNotEqualTo(dashboardBoxType2);
    }

    @Test
    public void testEqualsAndHashcodeEqualDashboardBoxTypesInSet() throws Exception {
        Set<DashboardBoxType> set = new HashSet<>();
        set.add(dashboardBoxType1);
        set.add(dashboardBoxType2);
        assertThat(set.size()).isEqualTo(1);
    }
}
