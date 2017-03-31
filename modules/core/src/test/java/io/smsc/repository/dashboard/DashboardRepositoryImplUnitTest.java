package io.smsc.repository.dashboard;

import io.smsc.model.admin.User;
import io.smsc.model.dashboard.Dashboard;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import javax.persistence.EntityManager;

import static org.powermock.api.mockito.PowerMockito.when;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(PowerMockRunner.class)
@PrepareForTest(DashboardRepositoryImpl.class)
public class DashboardRepositoryImplUnitTest {

    private DashboardRepositoryImpl dashboardRepository;

    private Dashboard dashboard;

    private User user;

    @Mock
    private EntityManager em;

    @Before
    public void setUp() throws Exception {
        dashboardRepository = PowerMockito.spy(new DashboardRepositoryImpl());

        user = new User();
        dashboard = new Dashboard();
        dashboard.setIcon("admin");
        dashboard.setName("default_admin");

        when(em.getDelegate()).thenReturn(em);

        PowerMockito.doReturn(user).when(dashboardRepository, "getLoggedUser");
    }

//    @Test
//    public void testSaveNewDashboard() throws Exception {
//        dashboardRepository.save(dashboard);
//
//        verify(em, times(1)).persist(dashboard);
//
//        PowerMockito.verifyPrivate(dashboardRepository, times(1)).invoke("getLoggedUser");
//    }
//
//    @Test
//    public void testUpdateOwnDashboard() throws Exception {
//        dashboard.setId(1L);
//        dashboard.setUser(user);
//        when(em.find(Dashboard.class,anyInt())).thenReturn(dashboard);
//
//        dashboardRepository.save(dashboard);
//
//        verify(em, times(1)).merge(dashboard);
//
//        PowerMockito.verifyPrivate(dashboardRepository, times(1)).invoke("getLoggedUser");
//    }
//
//    @Test
//    public void testUpdateNotOwnedDashboard() throws Exception {
//        dashboard.setId(1L);
//        dashboard.setUser(new User());
//        when(em.find(Dashboard.class,anyInt())).thenReturn(dashboard);
//
//        dashboardRepository.save(dashboard);
//
//        verify(em, times(0)).persist(dashboard);
//        verify(em, times(0)).merge(dashboard);
//
//        PowerMockito.verifyPrivate(dashboardRepository, times(1)).invoke("getLoggedUser");
//    }
//
//    @Test
//    public void testSaveNewDashboards() throws Exception {
//        List<Dashboard> dashboards = new ArrayList<>();
//        dashboards.add(dashboard);
//        dashboardRepository.save(dashboards);
//
//        verify(em, times(1)).persist(dashboard);
//
//        PowerMockito.verifyPrivate(dashboardRepository, times(1)).invoke("getLoggedUser");
//    }
//
//    @Test
//    public void testUpdateNewDashboards() throws Exception {
//        dashboard.setId(1L);
//        List<Dashboard> dashboards = new ArrayList<>();
//        dashboards.add(dashboard);
//        dashboardRepository.save(dashboards);
//
//        verify(em, times(1)).merge(dashboard);
//
//        PowerMockito.verifyPrivate(dashboardRepository, times(1)).invoke("getLoggedUser");
//    }
//
    @Test
    public void testUpdateNull() throws Exception {
        Iterable<Dashboard> dashboards = dashboardRepository.save((Iterable<Dashboard>) null);

        assertThat(dashboards).hasSize(0);
    }

}
