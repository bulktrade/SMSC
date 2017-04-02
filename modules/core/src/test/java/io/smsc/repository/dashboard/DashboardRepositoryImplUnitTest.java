package io.smsc.repository.dashboard;

import io.smsc.model.admin.User;
import io.smsc.model.dashboard.Dashboard;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.powermock.reflect.Whitebox;
import javax.persistence.EntityManager;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Matchers.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.doReturn;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(PowerMockRunner.class)
@PrepareForTest(DashboardRepositoryImpl.class)
public class DashboardRepositoryImplUnitTest {

    private DashboardRepositoryImpl dashboardRepository;

    private EntityManager em;

    private Dashboard dashboard;

    private User user;

    @Before
    public void setUp() throws Exception {
        dashboardRepository = PowerMockito.spy(new DashboardRepositoryImpl());
        user = new User();
        user.setId(1L);
        dashboard = new Dashboard();
        dashboard.setIcon("admin");
        dashboard.setName("default_admin");

        PowerMockito.doReturn(user).when(dashboardRepository, "getLoggedUser");

        em = PowerMockito.mock(EntityManager.class);

        doReturn(dashboard).when(em).merge(eq(dashboard));
        doReturn(dashboard).when(em).find(eq(Dashboard.class), anyLong());
        doNothing().when(em).persist(dashboard);

        Whitebox.setInternalState(dashboardRepository, em);
    }

    @Test
    public void testSaveNewDashboard() throws Exception {
        dashboardRepository.save(dashboard);

        verify(em, times(1)).persist(dashboard);

        PowerMockito.verifyPrivate(dashboardRepository, times(1)).invoke("getLoggedUser");

        assertThat(dashboard.getUser()).isEqualTo(user);
    }

    @Test
    public void testUpdateOwnedDashboard() throws Exception {
        dashboard.setId(1L);
        dashboard.setUser(user);
        dashboardRepository.save(dashboard);

        verify(em, times(1)).find(Dashboard.class, 1L);
        verify(em, times(1)).merge(dashboard);

        PowerMockito.verifyPrivate(dashboardRepository, times(1)).invoke("getLoggedUser");
    }

    @Test
    public void testUpdateNotOwnedDashboard() throws Exception {
        User fakeUser = new User();
        fakeUser.setId(2L);
        dashboard.setId(1L);
        dashboard.setUser(fakeUser);
        dashboardRepository.save(dashboard);

        verify(em, times(1)).find(Dashboard.class, 1L);
        verify(em, times(0)).merge(dashboard);

        PowerMockito.verifyPrivate(dashboardRepository, times(1)).invoke("getLoggedUser");
    }

    @Test
    public void testSaveNewDashboards() throws Exception {
        List<Dashboard> dashboards = new ArrayList<>();
        dashboards.add(dashboard);
        Iterable<Dashboard> dashboardList = dashboardRepository.save(dashboards);

        verify(em, times(1)).persist(dashboard);

        PowerMockito.verifyPrivate(dashboardRepository, times(1)).invoke("getLoggedUser");

        assertThat(dashboardList).hasSize(1);
    }

    @Test
    public void testUpdateNewDashboards() throws Exception {
        dashboard.setId(1L);
        dashboard.setUser(user);
        List<Dashboard> dashboards = new ArrayList<>();
        dashboards.add(dashboard);
        dashboardRepository.save(dashboards);

        verify(em, times(1)).find(Dashboard.class, 1L);
        verify(em, times(1)).merge(dashboard);

        PowerMockito.verifyPrivate(dashboardRepository, times(1)).invoke("getLoggedUser");
    }

    @Test
    public void testUpdateNullCollection() throws Exception {
        Iterable<Dashboard> dashboards = dashboardRepository.save((Iterable<Dashboard>) null);

        assertThat(dashboards).hasSize(0);
    }

}
