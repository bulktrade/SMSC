package io.smsc.repository.dashboard;

import io.smsc.model.admin.User;
import io.smsc.model.customer.Customer;
import io.smsc.model.dashboard.*;
import org.junit.Before;
import org.junit.Test;

import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class DashboardBoxTypeUnitTest {

    private DashboardBoxType dashboardBoxType1;
    private DashboardBoxType dashboardBoxType2;

    @Before
    public void initDashboardBoxTypes() throws Exception {
        dashboardBoxType1 = new DashboardBoxType();
        dashboardBoxType2 = new DashboardBoxType();
        dashboardBoxType1.setId(1L);
        dashboardBoxType1.setName("new dashboard box type");
        dashboardBoxType1.setType(Type.CHART);
        dashboardBoxType1.setKind(Kind.BAR_CHART);
        dashboardBoxType1.setCreatedBy(new User());
        dashboardBoxType1.setLastModifiedBy(new User());
        dashboardBoxType1.setCreatedDate(new Date());
        dashboardBoxType1.setLastModifiedDate(new Date());
        dashboardBoxType1.setVersion(0L);
        dashboardBoxType1.setDashboardBoxes(Collections.emptySet());
        dashboardBoxType2.setId(1L);
        dashboardBoxType2.setName("new dashboard box type");
        dashboardBoxType2.setType(Type.CHART);
        dashboardBoxType2.setKind(Kind.BAR_CHART);
        dashboardBoxType2.setDashboardBoxes(Collections.emptySet());
        dashboardBoxType2.setCreatedBy(new User());
        dashboardBoxType2.setLastModifiedBy(new User());
        dashboardBoxType2.setCreatedDate(new Date());
        dashboardBoxType2.setLastModifiedDate(new Date());
        dashboardBoxType2.setVersion(0L);
    }

    @Test
    public void testEqualsAndHashcodeSameDashboardBoxType() throws Exception {
        assertThat(dashboardBoxType1).isEqualTo(dashboardBoxType1);
        assertThat(dashboardBoxType1.getDashboardBoxes()).isEqualTo(dashboardBoxType1.getDashboardBoxes());
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
    public void testEqualsAndHashcodePairOfNonEqualDashboardBoxTypes1() throws Exception {
        dashboardBoxType2.setId(2L);

        assertThat(dashboardBoxType1).isNotEqualTo(dashboardBoxType2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualDashboardBoxTypes2() throws Exception {
        dashboardBoxType2.setName("some name");

        assertThat(dashboardBoxType1).isNotEqualTo(dashboardBoxType2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualDashboardBoxTypes3() throws Exception {
        dashboardBoxType2.setType(Type.STATUS);

        assertThat(dashboardBoxType1).isNotEqualTo(dashboardBoxType2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualDashboardBoxTypes4() throws Exception {
        dashboardBoxType2.setKind(Kind.FEEDBACK_STATUS);

        assertThat(dashboardBoxType1).isNotEqualTo(dashboardBoxType2);
    }

    @Test
    public void testEqualsAndHashcodeEqualDashboardBoxTypesInSet() throws Exception {
        Set<DashboardBoxType> set = new HashSet<>();
        set.add(dashboardBoxType1);
        set.add(dashboardBoxType2);

        assertThat(set.size()).isEqualTo(1);
    }

    @Test
    public void testDashboardBoxTypeToString() throws Exception {
        assertThat(dashboardBoxType1.toString()).isEqualTo("{id = " + dashboardBoxType1.getId() +
                ", name = '" + dashboardBoxType1.getName() + '\'' +
                ", type = '" + dashboardBoxType1.getType() + '\'' +
                ", kind = '" + dashboardBoxType1.getKind() + '\'' +
                ", version = " + dashboardBoxType1.getVersion() +
                ", createdDate = '" + dashboardBoxType1.getCreatedDate() + '\'' +
                ", lastModifiedDate = '" + dashboardBoxType1.getLastModifiedDate() + '\'' +
                "}");
    }
}
