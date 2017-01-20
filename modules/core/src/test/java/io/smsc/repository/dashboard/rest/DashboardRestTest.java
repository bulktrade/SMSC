package io.smsc.repository.dashboard.rest;

import io.smsc.AbstractTest;
import io.smsc.model.dashboard.Dashboard;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static io.smsc.test_data.UserTestData.*;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static io.smsc.test_data.DashboardTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class DashboardRestTest extends AbstractTest {

    @Test
    public void testGetSingleDashboard() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboards/242"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is(DASHBOARD_1.getName())))
                .andExpect(jsonPath("$.icon", is(DASHBOARD_1.getIcon())));
    }

    @Test
    public void testDashboardNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboards/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllDashboards() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboards"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.dashboards", hasSize(1)))
                .andExpect(jsonPath("$._embedded.dashboards[0].name", is(DASHBOARD_1.getName())))
                .andExpect(jsonPath("$._embedded.dashboards[0].icon", is(DASHBOARD_1.getIcon())));
    }

    @Test
    public void testCreateDashboard() throws Exception {
        String dashboardJson = json(new Dashboard(null, "default_admin", "admin", ADMIN));
        this.mockMvc.perform(post("/rest/repository/dashboards")
                .contentType("application/json;charset=UTF-8")
                .content(dashboardJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteDashboard() throws Exception {
        mockMvc.perform(delete("/rest/repository/dashboards/242"));
        mockMvc.perform(get("/rest/repository/dashboards/242"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateDashboard() throws Exception {
        Dashboard updated = new Dashboard(DASHBOARD_1);
        updated.setUser(ADMIN);
        updated.setIcon("new icon");
        updated.setName("new name");
        String dashboardJson = json(updated);
        mockMvc.perform(put("/rest/repository/dashboards/242")
                .contentType("application/json;charset=UTF-8")
                .content(dashboardJson))
                .andExpect(status().isOk());
        mockMvc.perform(get("/rest/repository/dashboards/242"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is(updated.getName())))
                .andExpect(jsonPath("$.icon", is(updated.getIcon())));
    }
}
