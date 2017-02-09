package io.smsc.repository.dashboard.rest;

import io.smsc.AbstractTest;
import io.smsc.model.dashboard.*;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username = "Admin", roles = {"ADMIN"})
public class DashboardBoxRestTest extends AbstractTest {

    @Test
    public void testGetSingleDashboardBox() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-boxes/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.width", is(Width.WIDTH_25.toString())))
                .andExpect(jsonPath("$.height", is(Height.HEIGHT_25.toString())))
                .andExpect(jsonPath("$.order", is(1)))
                .andExpect(jsonPath("$.name", is("Box 1")))
                .andExpect(jsonPath("$.description", is("Box 1 desc")));
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
                .andExpect(jsonPath("$._embedded.dashboard-boxes[0].order", is(1)))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[0].name", is("Box 1")))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[0].description", is("Box 1 desc")))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[8].width", is(Width.WIDTH_50.toString())))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[8].height", is(Height.HEIGHT_50.toString())))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[8].order", is(9)))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[8].name", is("Box 9")))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[8].description", is("Box 9 desc")));
    }

    @Test
    public void testCreateDashboardBox() throws Exception {
        DashboardBox dashboardBox = new DashboardBox();
        dashboardBox.setName("new box");
        dashboardBox.setOrder(99);
        dashboardBox.setWidth(Width.WIDTH_100);
        dashboardBox.setHeight(Height.HEIGHT_100);
        dashboardBox.setDescription("new box desc");
        String dashboardBoxJson = json(dashboardBox);
        // json is ignoring inserting dashboard and dashboardBoxType through setter
        dashboardBoxJson = dashboardBoxJson.substring(0, dashboardBoxJson.length() - 1).concat(", \"dashboard\" : \"/rest/repository/dashboards/1\", \r\n \"dashboardBoxType\" : \"/rest/repository/dashboard-box-types/1\" }");
        this.mockMvc.perform(post("/rest/repository/dashboard-boxes")
                .contentType("application/json;charset=UTF-8")
                .content(dashboardBoxJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteDashboardBox() throws Exception {
        mockMvc.perform(delete("/rest/repository/dashboard-boxes/1"));
        mockMvc.perform(get("/rest/repository/dashboard-boxes/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateDashboardBox() throws Exception {
        DashboardBox dashboardBox = new DashboardBox();
        dashboardBox.setId(1L);
        dashboardBox.setName("new box");
        dashboardBox.setOrder(99);
        dashboardBox.setWidth(Width.WIDTH_100);
        dashboardBox.setHeight(Height.HEIGHT_100);
        dashboardBox.setDescription("new box desc");
        String dashboardBoxJson = json(dashboardBox);
        mockMvc.perform(put("/rest/repository/dashboard-boxes/1")
                .contentType("application/json;charset=UTF-8")
                .content(dashboardBoxJson))
                .andExpect(status().isOk());
        mockMvc.perform(get("/rest/repository/dashboard-boxes/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.width", is(Width.WIDTH_100.toString())))
                .andExpect(jsonPath("$.height", is(Height.HEIGHT_100.toString())))
                .andExpect(jsonPath("$.order", is(99)))
                .andExpect(jsonPath("$.name", is("new box")))
                .andExpect(jsonPath("$.description", is("new box desc")));
    }
}
