package io.smsc.repository.dashboard;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.model.admin.User;
import io.smsc.model.dashboard.Dashboard;
import org.junit.Test;
import org.springframework.restdocs.mockmvc.RestDocumentationResultHandler;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.security.test.context.support.WithMockUser;

import static org.hamcrest.Matchers.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username = "Admin", roles = {"POWER_ADMIN_USER"})
public class DashboardRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleDashboard() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getDashboard");

        document
                .document(pathParameters(getPathParam("Dashboard")),
                        responseFields(dashboardFields(false)));

        mockMvc.perform(get("/rest/repository/dashboards/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("default")))
                .andExpect(jsonPath("$.icon", is("user")))
                .andDo(document);
    }

    @Test
    public void testDashboardNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboards/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllDashboards() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getDashboards");

        document
                .document(pathParameters(
                        parameterWithName("page").description("Page of results"),
                        parameterWithName("size").description("Size of results")),
                        responseFields(dashboardFields(true)));

        mockMvc.perform(get("/rest/repository/dashboards"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.dashboards", hasSize(1)))
                .andExpect(jsonPath("$._embedded.dashboards[0].name", is("default")))
                .andExpect(jsonPath("$._embedded.dashboards[0].icon", is("user")))
                .andDo(document);
    }

    @Test
    public void testCreateDashboard() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("createDashboard");

        document
                .document(requestFields(dashboardFields(false)),
                        responseFields(dashboardFields(false)));

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
                .andExpect(status().isCreated())
                .andDo(document);
    }

    @Test
    public void testDeleteDashboard() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("deleteDashboard");

        document
                .document(pathParameters(getPathParam("Dashboard")),
                        responseFields(dashboardFields(false)));

        mockMvc.perform(delete("/rest/repository/dashboards/1")
                .with(csrf()))
                .andDo(document);

        mockMvc.perform(get("/rest/repository/dashboards/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testReplaceDashboard() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("replaceDashboard");

        document
                .document(pathParameters(getPathParam("Dashboard")),
                        requestFields(dashboardFields(false)),
                        responseFields(dashboardFields(false)));

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
                .andExpect(status().isOk())
                .andDo(document);

        mockMvc.perform(get("/rest/repository/dashboards/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("default_admin")))
                .andExpect(jsonPath("$.icon", is("admin")));
    }

    /**
     * Dashboard fields used in requests and responses.
     * An array field equivalent can be provided
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] dashboardFields(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.dashboardss[]").description("Dashboard list"),
                        fieldWithPath("_embedded.dashboards[].id").description("Dashboard's id"),
                        fieldWithPath("_embedded.dashboards[].name").description("Dashboard's name"),
                        fieldWithPath("_embedded.dashboards[].icon").description("Dashboard's icon")

                } :
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.dashboards[].id").description("Dashboard's id"),
                        fieldWithPath("_embedded.dashboards[].name").description("Dashboard's name"),
                        fieldWithPath("_embedded.dashboards[].icon").description("Dashboard's icon")
                };
    }
}
