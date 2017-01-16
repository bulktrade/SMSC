package io.smsc.repository.dashboard.rest;

import io.smsc.AbstractTest;
import io.smsc.model.dashboard.DashboardBox;
import io.smsc.model.dashboard.Height;
import io.smsc.model.dashboard.Width;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static io.smsc.test_data.DashboardBoxTypeTestData.*;
import static io.smsc.test_data.DashboardTestData.*;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static io.smsc.test_data.DashboardBoxTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class DashboardBoxRestTest extends AbstractTest {

    @Test
    public void testGetSingleDashboardBox() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-boxes/147"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.width", is(Width.WIDTH_25.toString())))
                .andExpect(jsonPath("$.height", is(Height.HEIGHT_25.toString())))
                .andExpect(jsonPath("$.order", is(DASHBOARD_BOX_1.getOrder())))
                .andExpect(jsonPath("$.name", is(DASHBOARD_BOX_1.getName())))
                .andExpect(jsonPath("$.description", is(DASHBOARD_BOX_1.getDescription())));
    }

    @Test
    public void testDashboardBoxNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-boxes/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllDashboardBoxes() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-boxes"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.dashboard-boxes", hasSize(9)))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[0].width", is(Width.WIDTH_25.toString())))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[0].height", is(Height.HEIGHT_25.toString())))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[0].order", is(DASHBOARD_BOX_1.getOrder())))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[0].name", is(DASHBOARD_BOX_1.getName())))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[0].description", is(DASHBOARD_BOX_1.getDescription())))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[8].width", is(Width.WIDTH_50.toString())))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[8].height", is(Height.HEIGHT_50.toString())))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[8].order", is(DASHBOARD_BOX_9.getOrder())))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[8].name", is(DASHBOARD_BOX_9.getName())))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[8].description", is(DASHBOARD_BOX_9.getDescription())));
    }

    @Test
    public void testCreateDashboardBox() throws Exception {
        String dashboardBoxJson = json(new DashboardBox(null, Width.WIDTH_25, Height.HEIGHT_25, 50,
                "new dashboardBox", "new dashboardBox desc", DASHBOARD_1, DASHBOARD_BOX_TYPE_1));
        this.mockMvc.perform(post("/rest/repository/dashboard-boxes/create")
                .contentType("application/json;charset=UTF-8")
                .content(dashboardBoxJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteDashboardBox() throws Exception {
        mockMvc.perform(delete("/rest/repository/dashboard-boxes/147"));
        mockMvc.perform(get("/rest/repository/dashboard-box-types/147"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateDashboardBox() throws Exception {
        DashboardBox updated = new DashboardBox(DASHBOARD_BOX_1);
        updated.setName("new name");
        updated.setDescription("new description");
        updated.setOrder(60);
        updated.setWidth(Width.WIDTH_100);
        String dashboardBoxJson = json(updated);
        mockMvc.perform(put("/rest/repository/dashboard-boxes/update/147")
                .contentType("application/json;charset=UTF-8")
                .content(dashboardBoxJson))
                .andExpect(status().isOk());
        mockMvc.perform(get("/rest/repository/dashboard-boxes/147"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.width", is(Width.WIDTH_100.toString())))
                .andExpect(jsonPath("$.height", is(Height.HEIGHT_25.toString())))
                .andExpect(jsonPath("$.order", is(updated.getOrder())))
                .andExpect(jsonPath("$.name", is(updated.getName())))
                .andExpect(jsonPath("$.description", is(updated.getDescription())));
    }
}
