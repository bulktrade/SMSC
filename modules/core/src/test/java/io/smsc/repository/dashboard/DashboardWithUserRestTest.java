package io.smsc.repository.dashboard;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.jwt.service.impl.JWTUserDetailsServiceImpl;
import io.smsc.model.dashboard.Dashboard;
import org.junit.Before;
import org.junit.Test;
import org.springframework.security.core.userdetails.UserDetails;

import static org.hamcrest.Matchers.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class DashboardWithUserRestTest extends AbstractSpringMVCTest {

    private String userToken;

    @Before
    public void generateToken() throws Exception {
        UserDetails user = JWTUserDetailsServiceImpl.createJwtUser(userRepository.findByUsername("user"));
        userToken = jwtTokenGenerationService.generateAccessToken(user);
    }

    @Test
    public void testGetNotOwnedSingleDashboard() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboards/{id}", 1)
                .header(tokenHeader, userToken))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetNotOwnedAllDashboards() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboards?page=0&size=5")
                .header(tokenHeader, userToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.dashboards", hasSize(0)));
    }

    @Test
    public void testCreateDashboard() throws Exception {
        Dashboard dashboard = new Dashboard();
        dashboard.setId(null);
        dashboard.setIcon("admin");
        dashboard.setName("default_admin");
        String dashboardJson = json(dashboard);

        this.mockMvc.perform(post("/rest/repository/dashboards")
                .with(csrf())
                .header(tokenHeader, userToken)
                .contentType("application/json;charset=UTF-8")
                .content(dashboardJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteNotOwnedDashboard() throws Exception {
        mockMvc.perform(delete("/rest/repository/dashboards/{id}", 1)
                .with(csrf())
                .header(tokenHeader, userToken))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateNotOwnedDashboard() throws Exception {
        mockMvc.perform(patch("/rest/repository/dashboards/{id}", 1)
                .with(csrf())
                .header(tokenHeader, userToken)
                .contentType("application/json;charset=UTF-8")
                .content("{ \"name\" : \"default_admin\" }"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testReplaceNotOwnedDashboard() throws Exception {
        Dashboard dashboard = new Dashboard();
        dashboard.setId(1L);
        dashboard.setIcon("admin");
        dashboard.setName("default_admin");
        String dashboardJson = json(dashboard);

        mockMvc.perform(put("/rest/repository/dashboards/{id}", 1)
                .with(csrf())
                .header(tokenHeader, userToken)
                .contentType("application/json;charset=UTF-8")
                .content(dashboardJson))
                .andExpect(status().isForbidden());
    }
}
