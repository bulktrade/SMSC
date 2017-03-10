package io.smsc.repository.dashboard;

import io.smsc.AbstractTest;
import io.smsc.model.admin.User;
import io.smsc.model.dashboard.Dashboard;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username = "Admin", roles = {"POWER_ADMIN_USER"})
public class DashboardRestTest extends AbstractTest {

    @Test
    public void testGetSingleDashboard() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboards/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("default")))
                .andExpect(jsonPath("$.icon", is("user")));
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
                .andExpect(jsonPath("$._embedded.dashboards[0].name", is("default")))
                .andExpect(jsonPath("$._embedded.dashboards[0].icon", is("user")));
    }

    @Test
    public void testCreateDashboard() throws Exception {
        Dashboard dashboard = new Dashboard();
        dashboard.setId(null);
        dashboard.setIcon("admin");
        dashboard.setName("default_admin");
        String dashboardJson = json(dashboard);
        // json is ignoring inserting user through setter
        dashboardJson = dashboardJson.substring(0, dashboardJson.length() - 1).concat(", \"user\" : \"/rest/repository/users/1\" \r\n }");
        this.mockMvc.perform(post("/rest/repository/dashboards")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(dashboardJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteDashboard() throws Exception {
        mockMvc.perform(delete("/rest/repository/dashboards/1")
                .with(csrf()));
        mockMvc.perform(get("/rest/repository/dashboards/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateDashboard() throws Exception {
        Dashboard dashboard = new Dashboard();
        dashboard.setId(1L);
        dashboard.setIcon("admin");
        dashboard.setName("default_admin");
        dashboard.setUser(new User());
        String dashboardJson = json(dashboard);
        mockMvc.perform(put("/rest/repository/dashboards/1")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(dashboardJson))
                .andExpect(status().isOk());
        mockMvc.perform(get("/rest/repository/dashboards/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("default_admin")))
                .andExpect(jsonPath("$.icon", is("admin")));
    }
}
