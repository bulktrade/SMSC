package io.smsc.repository.dashboard.data_jpa;

import io.smsc.AbstractTest;
import io.smsc.model.dashboard.DashboardBoxType;
import io.smsc.model.dashboard.Kind;
import io.smsc.model.dashboard.Type;
import org.junit.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Arrays;
import java.util.Collection;

import static io.smsc.test_data.DashboardBoxTypeTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class DashboardBoxTypeJPATest extends AbstractTest {

    @Test
    public void testDeleteDashboardBoxType() throws Exception {
        dashboardBoxTypeRepository.delete(DASHBOARD_BOX_TYPE_ID_1);
        DASHBOARD_BOX_TYPE_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(DASHBOARD_BOX_TYPE_2,DASHBOARD_BOX_TYPE_3,
                DASHBOARD_BOX_TYPE_4,DASHBOARD_BOX_TYPE_5,DASHBOARD_BOX_TYPE_6), dashboardBoxTypeRepository.findAllDistinctByOrderById());
    }

    @Test
    public void testSaveDashboardBoxType() throws Exception {
        DashboardBoxType newDashboardBoxType = new DashboardBoxType(null, "new dashboard box type", Type.CHART, Kind.BAR_CHART);
        DashboardBoxType created = dashboardBoxTypeRepository.save(newDashboardBoxType);
        newDashboardBoxType.setId(created.getId());
        DASHBOARD_BOX_TYPE_MODEL_MATCHER.assertEquals(newDashboardBoxType, dashboardBoxTypeRepository.getOne(newDashboardBoxType.getId()));
    }

    @Test
    public void testGetSingleDashboardBoxType() throws Exception {
        DashboardBoxType dashboardBoxType = dashboardBoxTypeRepository.findOne(DASHBOARD_BOX_TYPE_ID_1);
        DASHBOARD_BOX_TYPE_MODEL_MATCHER.assertEquals(DASHBOARD_BOX_TYPE_1, dashboardBoxType);
    }

    @Test
    public void testGetAllDashboardBoxTypes() throws Exception {
        Collection<DashboardBoxType> dashboardBoxTypes = dashboardBoxTypeRepository.findAllDistinctByOrderById();
        DASHBOARD_BOX_TYPE_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(DASHBOARD_BOX_TYPE_1,DASHBOARD_BOX_TYPE_2,DASHBOARD_BOX_TYPE_3,
                DASHBOARD_BOX_TYPE_4,DASHBOARD_BOX_TYPE_5,DASHBOARD_BOX_TYPE_6), dashboardBoxTypes);
    }

    @Test
    public void testUpdateDashboardBoxType() throws Exception {
        DashboardBoxType updated = new DashboardBoxType(DASHBOARD_BOX_TYPE_1);
        updated.setName("new name");
        updated.setType(Type.STATUS);
        updated.setKind(Kind.ORDERS_STATUS);
        dashboardBoxTypeRepository.save(updated);
        DASHBOARD_BOX_TYPE_MODEL_MATCHER.assertEquals(updated, dashboardBoxTypeRepository.getOne(DASHBOARD_BOX_TYPE_ID_1));
    }

    @Test
    public void testGetDashboardBoxTypeByName() throws Exception {
        DashboardBoxType dashboardBoxType = dashboardBoxTypeRepository.findByName(DASHBOARD_BOX_TYPE_1.getName());
        DASHBOARD_BOX_TYPE_MODEL_MATCHER.assertEquals(DASHBOARD_BOX_TYPE_1, dashboardBoxType);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void testDuplicateDashboardBoxTypeNameSave() throws Exception {
        DashboardBoxType newDashboardBoxType = new DashboardBoxType(DASHBOARD_BOX_TYPE_1);
        newDashboardBoxType.setId(null);
        dashboardBoxTypeRepository.save(newDashboardBoxType);
        DASHBOARD_BOX_TYPE_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newDashboardBoxType,DASHBOARD_BOX_TYPE_1,
                DASHBOARD_BOX_TYPE_2,DASHBOARD_BOX_TYPE_3,DASHBOARD_BOX_TYPE_4,DASHBOARD_BOX_TYPE_5,DASHBOARD_BOX_TYPE_6),
                dashboardBoxTypeRepository.findAllDistinctByOrderById());
    }
}
