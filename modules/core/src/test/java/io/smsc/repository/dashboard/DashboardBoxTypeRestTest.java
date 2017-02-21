package io.smsc.repository.dashboard;

import io.smsc.AbstractTest;
import io.smsc.model.dashboard.DashboardBoxType;
import io.smsc.model.dashboard.Kind;
import io.smsc.model.dashboard.Type;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username = "Admin", roles = {"POWER_ADMIN_USER"})
public class DashboardBoxTypeRestTest extends AbstractTest {

    @Test
    public void testGetSingleDashboardBoxType() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-box-types/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("Ivan feeds")))
                .andExpect(jsonPath("$.type", is(Type.STATUS.toString())))
                .andExpect(jsonPath("$.kind", is(Kind.FEEDBACK_STATUS.toString())));
    }

    @Test
    public void testDashboardBoxTypeNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-box-types/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllDashboardBoxTypes() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-box-types"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.dashboard-box-types", hasSize(6)))
                .andExpect(jsonPath("$._embedded.dashboard-box-types[0].name", is("Ivan feeds")))
                .andExpect(jsonPath("$._embedded.dashboard-box-types[0].type", is(Type.STATUS.toString())))
                .andExpect(jsonPath("$._embedded.dashboard-box-types[0].kind", is(Kind.FEEDBACK_STATUS.toString())))
                .andExpect(jsonPath("$._embedded.dashboard-box-types[5].name", is("Masha bubble chartat")))
                .andExpect(jsonPath("$._embedded.dashboard-box-types[5].type", is(Type.CHART.toString())))
                .andExpect(jsonPath("$._embedded.dashboard-box-types[5].kind", is(Kind.BUBBLE_CHART.toString())));
    }

    @Test
    public void testCreateDashboardBoxType() throws Exception {
        DashboardBoxType dashboardBoxType = new DashboardBoxType();
        dashboardBoxType.setName("new dashboard box type");
        dashboardBoxType.setType(Type.CHART);
        dashboardBoxType.setKind(Kind.BAR_CHART);
        String dashboardBoxTypeJson = json(dashboardBoxType);
        this.mockMvc.perform(post("/rest/repository/dashboard-box-types")
                .contentType("application/json;charset=UTF-8")
                .content(dashboardBoxTypeJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteDashboardBoxType() throws Exception {
        mockMvc.perform(delete("/rest/repository/dashboard-box-types/1"));
        mockMvc.perform(get("/rest/repository/dashboard-box-types/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateDashboardBoxType() throws Exception {
        DashboardBoxType dashboardBoxType = new DashboardBoxType();
        dashboardBoxType.setId(1L);
        dashboardBoxType.setName("new dashboard box type");
        dashboardBoxType.setType(Type.CHART);
        dashboardBoxType.setKind(Kind.BAR_CHART);
        String dashboardBoxTypeJson = json(dashboardBoxType);
        mockMvc.perform(put("/rest/repository/dashboard-box-types/1")
                .contentType("application/json;charset=UTF-8")
                .content(dashboardBoxTypeJson))
                .andExpect(status().isOk());
        mockMvc.perform(get("/rest/repository/dashboard-box-types/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is(dashboardBoxType.getName())))
                .andExpect(jsonPath("$.type", is(Type.CHART.toString())))
                .andExpect(jsonPath("$.kind", is(Kind.BAR_CHART.toString())));
    }
}
