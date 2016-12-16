package io.smsc.repository.dashboard.data_jpa;

import io.smsc.AbstractTest;
import io.smsc.model.dashboard.Dashboard;
import io.smsc.model.dashboard.Height;
import io.smsc.model.dashboard.Width;
import org.junit.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import static io.smsc.test_data.DashboardBoxTestData.*;
import static io.smsc.test_data.DashboardBoxTypeTestData.*;
import static io.smsc.test_data.DashboardTestData.*;
import static io.smsc.test_data.UserTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class DashboardJPATest extends AbstractTest {

    @Test
    public void testDeleteDashboard() throws Exception {
        dashboardRepository.delete(DASHBOARD_ID_1);
        DASHBOARD_MODEL_MATCHER.assertCollectionEquals(Collections.emptyList(), dashboardRepository.findAllDistinctByOrderById());
    }

    @Test
    public void testSaveDashboard() throws Exception {
        Dashboard newDashboard = new Dashboard(null, "default_admin", "admin", ADMIN);
        Dashboard created = dashboardRepository.save(newDashboard);
        newDashboard.setId(created.getId());
        DASHBOARD_MODEL_MATCHER.assertEquals(newDashboard, dashboardRepository.getOne(newDashboard.getId()));
    }

    @Test
    public void testGetSingleDashboard() throws Exception {
        Dashboard dashboard = dashboardRepository.findOne(DASHBOARD_ID_1);
        DASHBOARD_MODEL_MATCHER.assertEquals(DASHBOARD_1,dashboard);
    }

    @Test
    public void testGetAllDashboards() throws Exception {
        Collection<Dashboard> dashboards = dashboardRepository.findAllDistinctByOrderById();
        DASHBOARD_MODEL_MATCHER.assertCollectionEquals(Collections.singletonList(DASHBOARD_1), dashboards);
    }

    @Test
    public void testUpdateDashboard() throws Exception{
        Dashboard updated = new Dashboard(DASHBOARD_1);
        updated.setUser(ADMIN);
        updated.setIcon("new icon");
        updated.setName("new name");
        dashboardRepository.save(updated);
        DASHBOARD_MODEL_MATCHER.assertEquals(updated, dashboardRepository.getOne(DASHBOARD_ID_1));
    }

    @Test
    public void testGetDashboardByName() throws Exception {
        Dashboard dashboard = dashboardRepository.findByName(DASHBOARD_1.getName());
        DASHBOARD_MODEL_MATCHER.assertEquals(DASHBOARD_1, dashboard);
    }

    @Test
    public void testGetDashboardsByUser() throws Exception {
        List<Dashboard> dashboards = dashboardRepository.findAllDistinctByUser(DASHBOARD_1.getUser());
        DASHBOARD_MODEL_MATCHER.assertCollectionEquals(Collections.singletonList(DASHBOARD_1), dashboards);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void testDuplicateDashboardNameUserSave() throws Exception {
        Dashboard newDashboard = new Dashboard(DASHBOARD_1);
        newDashboard.setId(null);
        dashboardRepository.save(newDashboard);
        DASHBOARD_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newDashboard,DASHBOARD_1), dashboardRepository.findAllDistinctByOrderById());
    }

    @Test
    public void testAddDashboardBox() throws Exception {
        Dashboard dashboard = dashboardRepository.addDashboardBox(DASHBOARD_ID_1,  DASHBOARD_BOX_TYPE_ID_1, Width.WIDTH_25,
                Height.HEIGHT_25, 50, "new dashboardBox", "new dashboardBox desc");
        DASHBOARD_MODEL_MATCHER.assertEquals(dashboard, dashboardRepository.getOne(DASHBOARD_ID_1));
    }

    @Test
    public void testRemoveDashboardBox() throws Exception {
        Dashboard dashboard = dashboardRepository.removeDashboardBox(DASHBOARD_ID_1, DASHBOARD_BOX_ID_1);
        DASHBOARD_MODEL_MATCHER.assertEquals(dashboard, dashboardRepository.getOne(DASHBOARD_ID_1));
    }
}
