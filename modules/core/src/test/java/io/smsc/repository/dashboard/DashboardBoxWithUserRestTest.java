package io.smsc.repository.dashboard;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.jwt.service.impl.JWTUserDetailsServiceImpl;
import io.smsc.model.dashboard.DashboardBox;
import io.smsc.model.dashboard.Height;
import io.smsc.model.dashboard.Width;
import org.junit.Before;
import org.junit.Test;
import org.springframework.security.core.userdetails.UserDetails;

import static org.hamcrest.Matchers.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class DashboardBoxWithUserRestTest extends AbstractSpringMVCTest {

    private String userToken;

    @Before
    public void generateToken() throws Exception {
        UserDetails user = JWTUserDetailsServiceImpl.createJwtUser(userRepository.findByUsername("user"));
        userToken = jwtTokenGenerationService.generateAccessToken(user);
    }

    @Test
    public void testGetNotOwnedSingleDashboardBox() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-boxes/{id}", 1)
                .header(tokenHeader, userToken))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetNotOwnedAllDashboardBoxes() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-boxes?page=0&size=5")
                .header(tokenHeader, userToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.dashboard-boxes", hasSize(0)));
    }

    @Test
    public void testCreateDashboardBoxForNotOwnedDashboard() throws Exception {
        DashboardBox dashboardBox = new DashboardBox();
        dashboardBox.setName("new box");
        dashboardBox.setOrder(99);
        dashboardBox.setWidth(Width.WIDTH_100);
        dashboardBox.setHeight(Height.HEIGHT_100);
        dashboardBox.setDescription("new box desc");
        String dashboardBoxJson = json(dashboardBox);
        // json is ignoring inserting dashboard and dashboardBoxType through setter
        dashboardBoxJson = dashboardBoxJson.substring(0, dashboardBoxJson.length() - 1)
                .concat(", \"dashboard\" : \"/rest/repository/dashboards/1\", \r\n " +
                        "\"dashboardBoxType\" : \"/rest/repository/dashboard-box-types/1\" }");

        this.mockMvc.perform(post("/rest/repository/dashboard-boxes")
                .with(csrf())
                .header(tokenHeader, userToken)
                .contentType("application/json;charset=UTF-8")
                .content(dashboardBoxJson))
                .andExpect(status().isConflict());
    }

    @Test
    public void testDeleteNotOwnedDashboardBox() throws Exception {
        mockMvc.perform(delete("/rest/repository/dashboard-boxes/{id}", 1)
                .with(csrf())
                .header(tokenHeader, userToken))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateNotOwnedDashboardBox() throws Exception {
        mockMvc.perform(patch("/rest/repository/dashboard-boxes/{id}", 1)
                .with(csrf())
                .header(tokenHeader, userToken)
                .contentType("application/json;charset=UTF-8")
                .content("{ \"name\" : \"new box\" }"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testReplaceNotOwnedDashboardBox() throws Exception {
        DashboardBox dashboardBox = new DashboardBox();
        dashboardBox.setId(1L);
        dashboardBox.setName("new box");
        dashboardBox.setOrder(99);
        dashboardBox.setWidth(Width.WIDTH_100);
        dashboardBox.setHeight(Height.HEIGHT_100);
        dashboardBox.setDescription("new box desc");
        String dashboardBoxJson = json(dashboardBox);
        // json is ignoring inserting dashboard and dashboardBoxType through setter
        dashboardBoxJson = dashboardBoxJson.substring(0, dashboardBoxJson.length() - 1)
                .concat(", \"dashboard\" : \"/rest/repository/dashboards/1\", " +
                        "\r\n \"dashboardBoxType\" : \"/rest/repository/dashboard-box-types/1\" }");

        mockMvc.perform(put("/rest/repository/dashboard-boxes/{id}", 1)
                .with(csrf())
                .header(tokenHeader, userToken)
                .contentType("application/json;charset=UTF-8")
                .content(dashboardBoxJson))
                .andExpect(status().isForbidden());
    }
}
