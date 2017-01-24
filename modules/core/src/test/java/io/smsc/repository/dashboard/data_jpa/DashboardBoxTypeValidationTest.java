package io.smsc.repository.dashboard.data_jpa;

import io.smsc.AbstractTest;
import io.smsc.model.dashboard.*;
import org.junit.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.security.test.context.support.WithMockUser;

import javax.validation.ConstraintViolationException;

import java.util.Arrays;

import static io.smsc.test_data.DashboardBoxTypeTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class DashboardBoxTypeValidationTest extends AbstractTest {

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyDashboardBoxTypeNameSave() throws Exception {
        DashboardBoxType newDashboardBoxType = new DashboardBoxType(null, "", Type.CHART, Kind.BAR_CHART);
        dashboardBoxTypeRepository.save(newDashboardBoxType);
        dashboardBoxTypeRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyDashboardBoxTypeTypeSave() throws Exception {
        DashboardBoxType newDashboardBoxType = new DashboardBoxType(null, "new dashboard box type", null, Kind.BAR_CHART);
        dashboardBoxTypeRepository.save(newDashboardBoxType);
        dashboardBoxTypeRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyDashboardBoxTypeKindSave() throws Exception {
        DashboardBoxType newDashboardBoxType = new DashboardBoxType(null, "new dashboard box type", Type.CHART, null);
        dashboardBoxTypeRepository.save(newDashboardBoxType);
        dashboardBoxTypeRepository.findAll();
    }

    @Test(expected = JpaSystemException.class)
    public void testDuplicateDashboardBoxTypeNameSave() throws Exception {
        DashboardBoxType newDashboardBoxType = dashboardBoxTypeRepository.findOne(243L);
        newDashboardBoxType.setId(null);
        dashboardBoxTypeRepository.save(newDashboardBoxType);
        DASHBOARD_BOX_TYPE_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newDashboardBoxType, DASHBOARD_BOX_TYPE_1,
                DASHBOARD_BOX_TYPE_2, DASHBOARD_BOX_TYPE_3, DASHBOARD_BOX_TYPE_4, DASHBOARD_BOX_TYPE_5, DASHBOARD_BOX_TYPE_6),
                dashboardBoxTypeRepository.findAll());
    }
}
