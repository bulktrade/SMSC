package io.smsc.repository.dashboard.rest;

import io.smsc.AbstractTest;
import io.smsc.model.dashboard.DashboardBoxType;
import io.smsc.model.dashboard.Kind;
import io.smsc.model.dashboard.Type;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Collections;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static io.smsc.test_data.DashboardBoxTypeTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class DashboardBoxTypeRestTest extends AbstractTest {

    @Test
    public void testGetSingleDashboardBoxType() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-box-types/search/findOne?id=141"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is(DASHBOARD_BOX_TYPE_1.getName())))
                .andExpect(jsonPath("$.type", is(Collections.singletonList(Type.STATUS.toString()))))
                .andExpect(jsonPath("$.kind", is(Collections.singletonList(Kind.FEEDBACK_STATUS.toString()))));
    }

    @Test
    public void testDashboardBoxTypeNotFound() throws Exception {
        mockMvc.perform(post("/rest/repository/dashboard-box-types/search/findOne?id=999")
                .content(this.json(new DashboardBoxType()))
                .contentType(contentType))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllDashboardBoxTypes() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-box-types/search/findAll"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.dashboards", hasSize(6)))
                .andExpect(jsonPath("$._embedded.dashboards[0].name", is(DASHBOARD_BOX_TYPE_1.getName())))
                .andExpect(jsonPath("$._embedded.dashboards[0].type", is(Collections.singletonList(Type.STATUS.toString()))))
                .andExpect(jsonPath("$._embedded.dashboards[0].kind", is(Collections.singletonList(Kind.FEEDBACK_STATUS.toString()))))
                .andExpect(jsonPath("$._embedded.dashboards[5].name", is(DASHBOARD_BOX_TYPE_6.getName())))
                .andExpect(jsonPath("$._embedded.dashboards[5].type", is(Collections.singletonList(Type.CHART.toString()))))
                .andExpect(jsonPath("$._embedded.dashboards[5].kind", is(Collections.singletonList(Kind.BUBBLE_CHART.toString()))));
    }

    @Test
    public void testCreateDashboardBoxType() throws Exception {
        String dashboardBoxTypeJson = json(new DashboardBoxType(null, "new dashboard box type", Type.CHART, Kind.BAR_CHART));
        this.mockMvc.perform(post("/rest/repository/dashboard-box-types/save")
                .contentType(contentType)
                .content(dashboardBoxTypeJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteDashboardBoxType() throws Exception {
        mockMvc.perform(delete("/rest/repository/dashboard-box-types/delete?id=141"));
        mockMvc.perform(post("/rest/repository/dashboard-box-types/search/findOne?id=141"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateDashboardBoxType() throws Exception {
        DashboardBoxType updated = new DashboardBoxType(DASHBOARD_BOX_TYPE_1);
        updated.setName("new name");
        updated.setType(Type.STATUS);
        updated.setKind(Kind.ORDERS_STATUS);
        String dashboardBoxTypeJson = json(updated);
        mockMvc.perform(put("/rest/repository/dashboard-box-types/save")
                .contentType(contentType)
                .content(dashboardBoxTypeJson))
                .andExpect(status().isNoContent());
        mockMvc.perform(get("/rest/repository/dashboard-box-types/search/findOne?id=141"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is(updated.getName())))
                .andExpect(jsonPath("$.type", is(Collections.singletonList(Type.STATUS.toString()))))
                .andExpect(jsonPath("$.kind", is(Collections.singletonList(Kind.ORDERS_STATUS.toString()))));
    }
}
