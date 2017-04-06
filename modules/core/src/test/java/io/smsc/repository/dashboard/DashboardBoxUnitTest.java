package io.smsc.repository.dashboard;

import io.smsc.model.admin.User;
import io.smsc.model.customer.Customer;
import io.smsc.model.dashboard.*;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class DashboardBoxUnitTest {

    private DashboardBox dashboardBox1;
    private DashboardBox dashboardBox2;

    @Before
    public void initDashboardBoxes() throws Exception {
        dashboardBox1 = new DashboardBox();
        dashboardBox2 = new DashboardBox();
        dashboardBox1.setId(1L);
        dashboardBox1.setName("new box");
        dashboardBox1.setOrder(99);
        dashboardBox1.setWidth(Width.WIDTH_100);
        dashboardBox1.setHeight(Height.HEIGHT_100);
        dashboardBox1.setDescription("new box desc");
        dashboardBox1.setCreatedBy(new User());
        dashboardBox1.setLastModifiedBy(new User());
        dashboardBox1.setCreatedDate(new Date());
        dashboardBox1.setLastModifiedDate(new Date());
        dashboardBox1.setVersion(0L);
        dashboardBox2.setId(1L);
        dashboardBox2.setName("new box");
        dashboardBox2.setOrder(99);
        dashboardBox2.setWidth(Width.WIDTH_100);
        dashboardBox2.setHeight(Height.HEIGHT_100);
        dashboardBox2.setDescription("new box desc");
        dashboardBox2.setCreatedBy(new User());
        dashboardBox2.setLastModifiedBy(new User());
        dashboardBox2.setCreatedDate(new Date());
        dashboardBox2.setLastModifiedDate(new Date());
        dashboardBox2.setVersion(0L);
    }

    @Test
    public void testEqualsAndHashcodeSameDashboardBox() throws Exception {
        assertThat(dashboardBox1).isEqualTo(dashboardBox1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualDashboardBoxes() throws Exception {
        assertThat(dashboardBox1).isEqualTo(dashboardBox2);
        assertThat(dashboardBox1.getDashboard()).isEqualTo(dashboardBox2.getDashboard());
        assertThat(dashboardBox1.getDashboardBoxType()).isEqualTo(dashboardBox2.getDashboardBoxType());
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
    public void testEqualsAndHashcodePairOfNonEqualDashboardBoxes1() throws Exception {
        dashboardBox2.setId(2L);

        assertThat(dashboardBox1).isNotEqualTo(dashboardBox2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualDashboardBoxes2() throws Exception {
        dashboardBox2.setWidth(Width.WIDTH_25);

        assertThat(dashboardBox1).isNotEqualTo(dashboardBox2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualDashboardBoxes3() throws Exception {
        dashboardBox2.setHeight(Height.HEIGHT_25);

        assertThat(dashboardBox1).isNotEqualTo(dashboardBox2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualDashboardBoxes4() throws Exception {
        dashboardBox2.setOrder(1);

        assertThat(dashboardBox1).isNotEqualTo(dashboardBox2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualDashboardBoxes5() throws Exception {
        dashboardBox2.setName("some name");

        assertThat(dashboardBox1).isNotEqualTo(dashboardBox2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualDashboardBoxes6() throws Exception {
        dashboardBox2.setDescription("some description");

        assertThat(dashboardBox1).isNotEqualTo(dashboardBox2);
    }

    @Test
    public void testEqualsAndHashcodeEqualDashboardBoxesInSet() throws Exception {
        Set<DashboardBox> set = new HashSet<>();
        set.add(dashboardBox1);
        set.add(dashboardBox2);

        assertThat(set.size()).isEqualTo(1);
    }

    @Test
    public void testDashboardBoxToString() throws Exception {
        assertThat(dashboardBox1.toString()).isEqualTo("{id = " + dashboardBox1.getId() +
                ", width = '" + dashboardBox1.getWidth() + '\'' +
                ", height = '" + dashboardBox1.getHeight() + '\'' +
                ", order = " + dashboardBox1.getOrder() +
                ", name = '" + dashboardBox1.getName() + '\'' +
                ", description = '" + dashboardBox1.getDescription() + '\'' +
                ", version = " + dashboardBox1.getVersion() +
                ", createdDate = '" + dashboardBox1.getCreatedDate() + '\'' +
                ", lastModifiedDate = '" + dashboardBox1.getLastModifiedDate() + '\'' +
                "}");
    }
}
