package io.smsc.repository.dashboard;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.model.dashboard.DashboardBoxType;
import io.smsc.model.dashboard.Kind;
import io.smsc.model.dashboard.Type;
import org.junit.Test;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.security.test.context.support.WithMockUser;

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

@WithMockUser(username = "Admin", roles = {"POWER_ADMIN_USER"})
public class DashboardBoxTypeRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleDashboardBoxType() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-box-types/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("Ivan feeds")))
                .andExpect(jsonPath("$.type", is(Type.STATUS.toString())))
                .andExpect(jsonPath("$.kind", is(Kind.FEEDBACK_STATUS.toString())))
                .andDo(document("getDashboardBoxType",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("DashboardBoxType")),
                        responseFields(dashboardBoxTypeFieldsForResponse(false))));
    }

    @Test
    public void testDashboardBoxTypeNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-box-types/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllDashboardBoxTypes() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-box-types?page=0&size=5"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.dashboard-box-types", hasSize(5)))
                .andExpect(jsonPath("$._embedded.dashboard-box-types[0].name", is("Ivan feeds")))
                .andExpect(jsonPath("$._embedded.dashboard-box-types[0].type", is(Type.STATUS.toString())))
                .andExpect(jsonPath("$._embedded.dashboard-box-types[0].kind", is(Kind.FEEDBACK_STATUS.toString())))
                .andDo(document("getDashboardBoxTypes",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("page").description("Page of results"),
                                parameterWithName("size").description("Size of results")),
                        responseFields(dashboardBoxTypeFieldsForResponse(true))));
    }

    @Test
    public void testCreateDashboardBoxType() throws Exception {
        DashboardBoxType dashboardBoxType = new DashboardBoxType();
        dashboardBoxType.setName("new dashboard box type");
        dashboardBoxType.setType(Type.CHART);
        dashboardBoxType.setKind(Kind.BAR_CHART);
        String dashboardBoxTypeJson = json(dashboardBoxType);

        mockMvc.perform(post("/rest/repository/dashboard-box-types")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(dashboardBoxTypeJson))
                .andExpect(status().isCreated())
                .andDo(document("createDashboardBoxType",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(dashboardBoxTypeFieldsForRequest(false)),
                        responseFields(dashboardBoxTypeFieldsForResponse(false))));
    }

    @Test
    public void testDeleteDashboardBoxType() throws Exception {
        mockMvc.perform(delete("/rest/repository/dashboard-box-types/{id}", 1)
                .with(csrf()))
                .andDo(document("deleteDashboardBoxType",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("DashboardBoxType"))));

        mockMvc.perform(get("/rest/repository/dashboard-box-types/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateDashboardBoxType() throws Exception {
        mockMvc.perform(patch("/rest/repository/dashboard-box-types/{id}", 1)
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content("{ \"name\" : \"new dashboard box type\" }"))
                .andExpect(status().isOk())
                .andDo(document("updateDashboardBoxType",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("DashboardBoxType")),
                        requestFields(dashboardBoxTypeFieldsForRequest(true)),
                        responseFields(dashboardBoxTypeFieldsForResponse(false))));

        mockMvc.perform(get("/rest/repository/dashboard-box-types/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("new dashboard box type")));
    }

    @Test
    public void testReplaceDashboardBoxType() throws Exception {
        DashboardBoxType dashboardBoxType = new DashboardBoxType();
        dashboardBoxType.setId(1L);
        dashboardBoxType.setName("new dashboard box type");
        dashboardBoxType.setType(Type.CHART);
        dashboardBoxType.setKind(Kind.BAR_CHART);
        String dashboardBoxTypeJson = json(dashboardBoxType);

        mockMvc.perform(put("/rest/repository/dashboard-box-types/{id}", 1)
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(dashboardBoxTypeJson))
                .andExpect(status().isOk())
                .andDo(document("replaceDashboardBoxType",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("DashboardBoxType")),
                        requestFields(dashboardBoxTypeFieldsForRequest(false)),
                        responseFields(dashboardBoxTypeFieldsForResponse(false))));

        mockMvc.perform(get("/rest/repository/dashboard-box-types/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is(dashboardBoxType.getName())))
                .andExpect(jsonPath("$.type", is(Type.CHART.toString())))
                .andExpect(jsonPath("$.kind", is(Kind.BAR_CHART.toString())));
    }

    /**
     * DashboardBoxType fields used in responses.
     * An array field equivalent can be provided.
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] dashboardBoxTypeFieldsForResponse(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.dashboard-box-types[]").description("DashboardBoxType list"),
                        fieldWithPath("_embedded.dashboard-box-types[].id").description("DashboardBoxType's id"),
                        fieldWithPath("_embedded.dashboard-box-types[].name").description("DashboardBoxType's name"),
                        fieldWithPath("_embedded.dashboard-box-types[].type").description("DashboardBoxType's type"),
                        fieldWithPath("_embedded.dashboard-box-types[].kind").description("DashboardBoxType's kind"),
                        fieldWithPath("_embedded.dashboard-box-types[].lastModifiedDate").type(Date.class)
                                .description("DashboardBoxType's date of last modification"),
                        fieldWithPath("_embedded.dashboard-box-types[].createdDate").type(Date.class)
                                .description("DashboardBoxType's creation date"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("DashboardBoxType's id"),
                        fieldWithPath("name").description("DashboardBoxType's name"),
                        fieldWithPath("type").description("DashboardBoxType's type"),
                        fieldWithPath("kind").description("DashboardBoxType's kind"),
                        fieldWithPath("lastModifiedDate").type(Date.class)
                                .description("DashboardBoxType's date of last modification"),
                        fieldWithPath("createdDate").type(Date.class).description("DashboardBoxType's creation date"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };
    }

    /**
     * DashboardBoxType fields used in requests.
     *
     * @return FieldDescriptor
     */
    private FieldDescriptor[] dashboardBoxTypeFieldsForRequest(boolean isPatchRequest) {
        return isPatchRequest ?
                new FieldDescriptor[]{
                        fieldWithPath("name").optional().type(String.class).description("DashboardBoxType's name")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("type").optional().type(Type.class).description("DashboardBoxType's type")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("kind").optional().type(Kind.class).description("DashboardBoxType's kind")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("id").optional().ignored(),
                        fieldWithPath("lastModifiedDate").optional().ignored(),
                        fieldWithPath("createdDate").optional().ignored(),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                } :
                new FieldDescriptor[]{
                        fieldWithPath("name").type(String.class).description("DashboardBoxType's name")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("type").type(Type.class).description("DashboardBoxType's type")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("kind").type(Kind.class).description("DashboardBoxType's kind")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("id").optional().ignored(),
                        fieldWithPath("lastModifiedDate").optional().ignored(),
                        fieldWithPath("createdDate").optional().ignored(),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };
    }
}
