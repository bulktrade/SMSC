//package io.smsc.repository.dashboard.data_jpa;
//
//import io.smsc.AbstractTest;
//import io.smsc.model.dashboard.DashboardBox;
//import io.smsc.model.dashboard.Height;
//import io.smsc.model.dashboard.Width;
//import org.junit.Test;
//import org.springframework.security.test.context.support.WithMockUser;
//
//import java.util.Arrays;
//import java.util.Collection;
//import java.util.List;
//
//import static io.smsc.test_data.DashboardBoxTestData.*;
//import static io.smsc.test_data.DashboardBoxTypeTestData.*;
//import static io.smsc.test_data.DashboardTestData.*;
//
//@WithMockUser(username="Admin",roles = {"ADMIN"})
//public class DashboardBoxJPATest extends AbstractTest {
//
////    @Test
////    public void testDeleteDashboardBox() throws Exception {
////        dashboardBoxRepository.delete(DASHBOARD_BOX_ID_1);
////        DASHBOARD_BOX_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(DASHBOARD_BOX_2, DASHBOARD_BOX_3, DASHBOARD_BOX_4,
////                DASHBOARD_BOX_5, DASHBOARD_BOX_6, DASHBOARD_BOX_7, DASHBOARD_BOX_8, DASHBOARD_BOX_9), dashboardBoxRepository.findAll());
////    }
////
////    @Test
////    public void testSaveDashboardBox() throws Exception {
////        DashboardBox newDashboardBox = new DashboardBox(null, Width.WIDTH_25, Height.HEIGHT_25, 50, "new dashboardBox",
////                "new dashboardBox desc", dashboardRepository.findOne(242L), dashboardBoxTypeRepository.findOne(243L));
////        DashboardBox created = dashboardBoxRepository.save(newDashboardBox);
////        newDashboardBox.setId(created.getId());
////        DASHBOARD_BOX_MODEL_MATCHER.assertEquals(newDashboardBox, dashboardBoxRepository.getOne(newDashboardBox.getId()));
////    }
////
////    @Test
////    public void testGetSingleDashboardBox() throws Exception {
////        DashboardBox dashboardBox = dashboardBoxRepository.findOne(DASHBOARD_BOX_ID_1);
////        DASHBOARD_BOX_MODEL_MATCHER.assertEquals(DASHBOARD_BOX_1, dashboardBox);
////    }
////
////    @Test
////    public void testGetAllDashboardBoxes() throws Exception {
////        Collection<DashboardBox> dashboardBoxes = dashboardBoxRepository.findAll();
////        DASHBOARD_BOX_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(DASHBOARD_BOX_1, DASHBOARD_BOX_2, DASHBOARD_BOX_3, DASHBOARD_BOX_4,
////                DASHBOARD_BOX_5, DASHBOARD_BOX_6, DASHBOARD_BOX_7, DASHBOARD_BOX_8, DASHBOARD_BOX_9), dashboardBoxes);
////    }
////
////    @Test
////    public void testUpdateDashboardBox() throws Exception {
////        DashboardBox updated = dashboardBoxRepository.findOne(249L);
////        updated.setName("new name");
////        updated.setDescription("new description");
////        updated.setOrder(60);
////        updated.setWidth(Width.WIDTH_100);
////        dashboardBoxRepository.save(updated);
////        DASHBOARD_BOX_MODEL_MATCHER.assertEquals(updated, dashboardBoxRepository.getOne(DASHBOARD_BOX_ID_1));
////    }
////
////    @Test
////    public void testGetDashboardBoxesByDashboard() throws Exception {
////        List<DashboardBox> dashboardBoxes = dashboardBoxRepository.findAllByDashboard(dashboardRepository.findOne(242L));
////        DASHBOARD_BOX_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(DASHBOARD_BOX_1, DASHBOARD_BOX_2, DASHBOARD_BOX_3,
////                DASHBOARD_BOX_4, DASHBOARD_BOX_5, DASHBOARD_BOX_6, DASHBOARD_BOX_7, DASHBOARD_BOX_8, DASHBOARD_BOX_9),dashboardBoxes);
////    }
////
////    @Test
////    public void testGetDashboardBoxesByDashboardBoxType() throws Exception {
////        List<DashboardBox> dashboardBoxes = dashboardBoxRepository.findAllByDashboardBoxType(dashboardBoxTypeRepository.findOne(243L));
////        DASHBOARD_BOX_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(DASHBOARD_BOX_1, DASHBOARD_BOX_2, DASHBOARD_BOX_3,
////                DASHBOARD_BOX_4),dashboardBoxes);
////    }
//
//}
