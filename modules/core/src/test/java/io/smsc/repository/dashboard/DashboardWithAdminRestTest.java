package io.smsc.repository.dashboard;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.jwt.service.impl.JWTUserDetailsServiceImpl;
import io.smsc.model.admin.User;
import io.smsc.model.dashboard.Dashboard;
import org.junit.Before;
import org.junit.Test;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;

import static org.hamcrest.Matchers.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class DashboardWithAdminRestTest extends AbstractSpringMVCTest {

    private String adminToken;

    @Before
    public void generateToken() throws Exception {
        UserDetails admin = JWTUserDetailsServiceImpl.createJwtUser(userRepository.findByUsername("admin"));
        adminToken = jwtTokenGenerationService.generateAccessToken(admin);
    }

    @Test
    public void testGetOwnedSingleDashboard() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboards/{id}", 1)
                .header(tokenHeader, adminToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("default")))
                .andExpect(jsonPath("$.icon", is("user")))
                .andDo(document("getDashboard",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Dashboard")),
                        responseFields(dashboardFieldsForResponse(false))));
    }

    @Test
    public void testDashboardNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboards/999")
                .header(tokenHeader, adminToken))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetOwnedAllDashboards() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboards?page=0&size=5")
                .header(tokenHeader, adminToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.dashboards", hasSize(1)))
                .andExpect(jsonPath("$._embedded.dashboards[0].name", is("default")))
                .andExpect(jsonPath("$._embedded.dashboards[0].icon", is("user")))
                .andDo(document("getDashboards",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("page").description("Page of results"),
                                parameterWithName("size").description("Size of results")),
                        responseFields(dashboardFieldsForResponse(true))));
    }

    @Test
    public void testCreateDashboard() throws Exception {
        Dashboard dashboard = new Dashboard();
        dashboard.setId(null);
        dashboard.setIcon("admin");
        dashboard.setName("default_admin");
        String dashboardJson = json(dashboard);
        // json is ignoring inserting user through setter
        dashboardJson = dashboardJson.substring(0, dashboardJson.length() - 1)
                .concat(", \"user\" : \"/rest/repository/users/1\" \r\n }");

        this.mockMvc.perform(post("/rest/repository/dashboards")
                .with(csrf())
                .header(tokenHeader, adminToken)
                .contentType("application/json;charset=UTF-8")
                .content(dashboardJson))
                .andExpect(status().isCreated())
                .andDo(document("createDashboard",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(dashboardFieldsForRequest(false)),
                        responseFields(dashboardFieldsForResponse(false))));
    }

    @Test
    public void testDeleteOwnedDashboard() throws Exception {
        mockMvc.perform(delete("/rest/repository/dashboards/{id}", 1)
                .with(csrf())
                .header(tokenHeader, adminToken))
                .andExpect(status().isNoContent())
                .andDo(document("deleteDashboard",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Dashboard"))));

        mockMvc.perform(get("/rest/repository/dashboards/1")
                .header(tokenHeader, adminToken))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateOwnedDashboard() throws Exception {
        mockMvc.perform(patch("/rest/repository/dashboards/{id}", 1)
                .with(csrf())
                .header(tokenHeader, adminToken)
                .contentType("application/json;charset=UTF-8")
                .content("{ \"name\" : \"default_admin\" }"))
                .andExpect(status().isOk())
                .andDo(document("updateDashboard",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Dashboard")),
                        requestFields(dashboardFieldsForRequest(true)),
                        responseFields(dashboardFieldsForResponse(false))));

        mockMvc.perform(get("/rest/repository/dashboards/1")
                .header(tokenHeader, adminToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("default_admin")));
    }

    @Test
    public void testReplaceOwnedDashboard() throws Exception {
        Dashboard dashboard = new Dashboard();
        dashboard.setId(1L);
        dashboard.setIcon("admin");
        dashboard.setName("default_admin");
        dashboard.setUser(new User());
        String dashboardJson = json(dashboard);
        // json is ignoring inserting user through setter
        dashboardJson = dashboardJson.substring(0, dashboardJson.length() - 1)
                .concat(", \"user\" : \"/rest/repository/users/1\" \r\n }");

        mockMvc.perform(put("/rest/repository/dashboards/{id}", 1)
                .with(csrf())
                .header(tokenHeader, adminToken)
                .contentType("application/json;charset=UTF-8")
                .content(dashboardJson))
                .andExpect(status().isOk())
                .andDo(document("replaceDashboard",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Dashboard")),
                        requestFields(dashboardFieldsForRequest(false)),
                        responseFields(dashboardFieldsForResponse(false))));

        mockMvc.perform(get("/rest/repository/dashboards/1")
                .header(tokenHeader, adminToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("default_admin")))
                .andExpect(jsonPath("$.icon", is("admin")));
    }

    /**
     * Dashboard fields used in responses.
     * An array field equivalent can be provided
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] dashboardFieldsForResponse(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.dashboards[]").description("Dashboard list"),
                        fieldWithPath("_embedded.dashboards[].id").description("Dashboard's id"),
                        fieldWithPath("_embedded.dashboards[].name").description("Dashboard's name"),
                        fieldWithPath("_embedded.dashboards[].icon").description("Dashboard's icon"),
                        fieldWithPath("_embedded.dashboards[].lastModifiedDate").type(Date.class)
                                .description("AdminUser's date of last modification"),
                        fieldWithPath("_embedded.dashboards[].createdDate").type(Date.class)
                                .description("Dashboard's creation date"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()

                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("Dashboard's id"),
                        fieldWithPath("name").description("Dashboard's name"),
                        fieldWithPath("icon").description("Dashboard's icon"),
                        fieldWithPath("lastModifiedDate").type(Date.class)
                                .description("Dashboard's date of last modification"),
                        fieldWithPath("createdDate").type(Date.class).description("Dashboard's creation date"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };
    }

    /**
     * Dashboard fields used in requests.
     *
     * @return FieldDescriptor
     */
    private FieldDescriptor[] dashboardFieldsForRequest(boolean isPatchRequest) {
        return isPatchRequest ?
                new FieldDescriptor[]{
                fieldWithPath("name").optional().type(String.class).description("Dashboard's name")
                        .attributes(key("mandatory").value(false)),
                fieldWithPath("icon").optional().type(String.class).description("Dashboard's icon")
                        .attributes(key("mandatory").value(false)),
                fieldWithPath("user").optional().type(User.class).description("Dashboard's user")
                        .attributes(key("mandatory").value(false)),
                fieldWithPath("id").optional().ignored(),
                fieldWithPath("lastModifiedDate").optional().ignored(),
                fieldWithPath("createdDate").optional().ignored(),
                fieldWithPath("_links").optional().ignored(),
                fieldWithPath("page").optional().ignored()
        } :
                new FieldDescriptor[]{
                        fieldWithPath("name").type(String.class).description("Dashboard's name")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("icon").type(String.class).description("Dashboard's icon")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("user").type(User.class).description("Dashboard's user")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("id").optional().ignored(),
                        fieldWithPath("lastModifiedDate").optional().ignored(),
                        fieldWithPath("createdDate").optional().ignored(),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };
    }
}
