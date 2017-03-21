package io.smsc.repository.dashboard;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.model.dashboard.DashboardBoxType;
import io.smsc.model.dashboard.Kind;
import io.smsc.model.dashboard.Type;
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
public class DashboardBoxTypeRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleDashboardBoxType() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getDashboardBoxType");

        document
                .document(pathParameters(getPathParam("DashboardBoxType")),
                        responseFields(dashboardBoxTypeFields(false)));

        mockMvc.perform(get("/rest/repository/dashboard-box-types/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("Ivan feeds")))
                .andExpect(jsonPath("$.type", is(Type.STATUS.toString())))
                .andExpect(jsonPath("$.kind", is(Kind.FEEDBACK_STATUS.toString())))
                .andDo(document);
    }

    @Test
    public void testDashboardBoxTypeNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-box-types/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllDashboardBoxTypes() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getDashboardBoxTypes");

        document
                .document(pathParameters(
                        parameterWithName("page").description("Page of results"),
                        parameterWithName("size").description("Size of results")),
                        responseFields(dashboardBoxTypeFields(true)));

        mockMvc.perform(get("/rest/repository/dashboard-box-types"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.dashboard-box-types", hasSize(6)))
                .andExpect(jsonPath("$._embedded.dashboard-box-types[0].name", is("Ivan feeds")))
                .andExpect(jsonPath("$._embedded.dashboard-box-types[0].type", is(Type.STATUS.toString())))
                .andExpect(jsonPath("$._embedded.dashboard-box-types[0].kind", is(Kind.FEEDBACK_STATUS.toString())))
                .andExpect(jsonPath("$._embedded.dashboard-box-types[5].name", is("Masha bubble chartat")))
                .andExpect(jsonPath("$._embedded.dashboard-box-types[5].type", is(Type.CHART.toString())))
                .andExpect(jsonPath("$._embedded.dashboard-box-types[5].kind", is(Kind.BUBBLE_CHART.toString())))
                .andDo(document);
    }

    @Test
    public void testCreateDashboardBoxType() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("createDashboardBoxType");

        document
                .document(requestFields(dashboardBoxTypeFields(false)),
                        responseFields(dashboardBoxTypeFields(false)));

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
                .andDo(document);
    }

    @Test
    public void testDeleteDashboardBoxType() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("deleteDashboardBoxType");

        document
                .document(pathParameters(getPathParam("DashboardBoxType")),
                        responseFields(dashboardBoxTypeFields(false)));

        mockMvc.perform(delete("/rest/repository/dashboard-box-types/1")
                .with(csrf()))
                .andDo(document);

        mockMvc.perform(get("/rest/repository/dashboard-box-types/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testReplaceDashboardBoxType() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("replaceDashboardBoxType");

        document
                .document(pathParameters(getPathParam("DashboardBoxType")),
                        requestFields(dashboardBoxTypeFields(false)),
                        responseFields(dashboardBoxTypeFields(false)));

        DashboardBoxType dashboardBoxType = new DashboardBoxType();
        dashboardBoxType.setId(1L);
        dashboardBoxType.setName("new dashboard box type");
        dashboardBoxType.setType(Type.CHART);
        dashboardBoxType.setKind(Kind.BAR_CHART);
        String dashboardBoxTypeJson = json(dashboardBoxType);

        mockMvc.perform(put("/rest/repository/dashboard-box-types/1")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(dashboardBoxTypeJson))
                .andExpect(status().isOk())
                .andDo(document);

        mockMvc.perform(get("/rest/repository/dashboard-box-types/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is(dashboardBoxType.getName())))
                .andExpect(jsonPath("$.type", is(Type.CHART.toString())))
                .andExpect(jsonPath("$.kind", is(Kind.BAR_CHART.toString())));
    }

    /**
     * DashboardBoxType fields used in requests and responses.
     * An array field equivalent can be provided
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] dashboardBoxTypeFields(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.dashboard-box-types[]").description("DashboardBoxType list"),
                        fieldWithPath("_embedded.dashboard-box-types[].id").description("DashboardBoxType's id"),
                        fieldWithPath("_embedded.dashboard-box-types[].name").description("DashboardBoxType's name"),
                        fieldWithPath("_embedded.dashboard-box-types[].type").description("DashboardBoxType's type"),
                        fieldWithPath("_embedded.dashboard-box-types[].kind").description("DashboardBoxType's kind")
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("DashboardBoxType's id"),
                        fieldWithPath("name").description("DashboardBoxType's name"),
                        fieldWithPath("type").description("DashboardBoxType's type"),
                        fieldWithPath("kind").description("DashboardBoxType's kind")
                };
    }
}
