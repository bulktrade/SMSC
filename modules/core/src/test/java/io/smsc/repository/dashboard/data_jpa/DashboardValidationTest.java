package io.smsc.repository.dashboard.data_jpa;

import io.smsc.AbstractTest;
import io.smsc.model.dashboard.Dashboard;
import org.junit.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.test.context.support.WithMockUser;

import javax.validation.ConstraintViolationException;

import java.util.Arrays;

import static io.smsc.test_data.DashboardTestData.*;
import static io.smsc.test_data.UserTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class DashboardValidationTest extends AbstractTest {

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyDashboardNameSave() throws Exception {
        Dashboard newDashboard = new Dashboard(null, "", "admin", ADMIN);
        dashboardRepository.save(newDashboard);
        dashboardRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyDashboardIconSave() throws Exception {
        Dashboard newDashboard = new Dashboard(null, "default_admin", "", ADMIN);
        dashboardRepository.save(newDashboard);
        dashboardRepository.findAll();
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void testEmptyDashboardUserSave() throws Exception {
        Dashboard newDashboard = new Dashboard(null, "default_admin", "admin", null);
        dashboardRepository.save(newDashboard);
        dashboardRepository.findAll();
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void testDuplicateDashboardNameUserSave() throws Exception {
        Dashboard newDashboard = new Dashboard(DASHBOARD_1);
        newDashboard.setId(null);
        dashboardRepository.save(newDashboard);
        DASHBOARD_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newDashboard, DASHBOARD_1), dashboardRepository.findAll());
    }
}
