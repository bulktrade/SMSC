package io.smsc.repository.dashboard.data_jpa;

import io.smsc.AbstractTest;
import io.smsc.model.dashboard.DashboardBox;
import io.smsc.model.dashboard.Height;
import io.smsc.model.dashboard.Width;
import org.junit.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.test.context.support.WithMockUser;

import javax.validation.ConstraintViolationException;

import static io.smsc.test_data.DashboardBoxTypeTestData.DASHBOARD_BOX_TYPE_1;
import static io.smsc.test_data.DashboardTestData.DASHBOARD_1;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class DashboardBoxValidationTest extends AbstractTest {

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyDashboardBoxWidthSave() throws Exception {
        DashboardBox newDashboardBox = new DashboardBox(null, null, Height.HEIGHT_25, 50, "new dashboardBox",
                "new dashboardBox desc", dashboardRepository.findOne(242L), dashboardBoxTypeRepository.findOne(243L));
        dashboardBoxRepository.save(newDashboardBox);
        dashboardBoxRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyDashboardBoxHeightSave() throws Exception {
        DashboardBox newDashboardBox = new DashboardBox(null, Width.WIDTH_25, null, 50, "new dashboardBox",
                "new dashboardBox desc", dashboardRepository.findOne(242L), dashboardBoxTypeRepository.findOne(243L));
        dashboardBoxRepository.save(newDashboardBox);
        dashboardBoxRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyDashboardBoxOrderSave() throws Exception {
        DashboardBox newDashboardBox = new DashboardBox(null, Width.WIDTH_25, Height.HEIGHT_25, null, "new dashboardBox",
                "new dashboardBox desc", dashboardRepository.findOne(242L), dashboardBoxTypeRepository.findOne(243L));
        dashboardBoxRepository.save(newDashboardBox);
        dashboardBoxRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyDashboardBoxNameSave() throws Exception {
        DashboardBox newDashboardBox = new DashboardBox(null, Width.WIDTH_25, Height.HEIGHT_25, 50, "",
                "new dashboardBox desc", dashboardRepository.findOne(242L), dashboardBoxTypeRepository.findOne(243L));
        dashboardBoxRepository.save(newDashboardBox);
        dashboardBoxRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyDashboardBoxDescriptionSave() throws Exception {
        DashboardBox newDashboardBox = new DashboardBox(null, Width.WIDTH_25, Height.HEIGHT_25, 50, "new dashboardBox",
                "", dashboardRepository.findOne(242L), dashboardBoxTypeRepository.findOne(243L));
        dashboardBoxRepository.save(newDashboardBox);
        dashboardBoxRepository.findAll();
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void testEmptyDashboardBoxDashboardSave() throws Exception {
        DashboardBox newDashboardBox = new DashboardBox(null, Width.WIDTH_25, Height.HEIGHT_25, 50, "new dashboardBox",
                "new dashboardBox desc", null, dashboardBoxTypeRepository.findOne(243L));
        dashboardBoxRepository.save(newDashboardBox);
        dashboardBoxRepository.findAll();
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void testEmptyDashboardBoxDashboardBoxTypeSave() throws Exception {
        DashboardBox newDashboardBox = new DashboardBox(null, Width.WIDTH_25, Height.HEIGHT_25, 50, "new dashboardBox",
                "new dashboardBox desc", dashboardRepository.findOne(242L), null);
        dashboardBoxRepository.save(newDashboardBox);
        dashboardBoxRepository.findAll();
    }
}
