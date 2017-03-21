package io.smsc.repository.dashboard;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.model.dashboard.*;
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
public class DashboardBoxRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleDashboardBox() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getDashboardBox");

        document
                .document(pathParameters(getPathParam("DashboardBox")),
                        responseFields(dashboardBoxFields(false)));

        mockMvc.perform(get("/rest/repository/dashboard-boxes/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.width", is(Width.WIDTH_25.toString())))
                .andExpect(jsonPath("$.height", is(Height.HEIGHT_25.toString())))
                .andExpect(jsonPath("$.order", is(1)))
                .andExpect(jsonPath("$.name", is("Box 1")))
                .andExpect(jsonPath("$.description", is("Box 1 desc")))
                .andDo(document);
    }

    @Test
    public void testDashboardBoxNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-boxes/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllDashboardBoxes() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getDashboardBoxes");

        document
                .document(pathParameters(
                        parameterWithName("page").description("Page of results"),
                        parameterWithName("size").description("Size of results")),
                        responseFields(dashboardBoxFields(true)));

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
                .andExpect(jsonPath("$._embedded.dashboard-boxes[8].description", is("Box 9 desc")))
                .andDo(document);
    }

    @Test
    public void testCreateDashboardBox() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("createDashboardBox");

        document
                .document(requestFields(dashboardBoxFields(false)),
                        responseFields(dashboardBoxFields(false)));

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
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(dashboardBoxJson))
                .andExpect(status().isCreated())
                .andDo(document);
    }

    @Test
    public void testDeleteDashboardBox() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("deleteDashboardBox");

        document
                .document(pathParameters(getPathParam("DashboardBox")),
                        responseFields(dashboardBoxFields(false)));

        mockMvc.perform(delete("/rest/repository/dashboard-boxes/1")
                .with(csrf()))
                .andDo(document);

        mockMvc.perform(get("/rest/repository/dashboard-boxes/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testReplaceDashboardBox() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("replaceDashboardBox");

        document
                .document(pathParameters(getPathParam("DashboardBox")),
                        requestFields(dashboardBoxFields(false)),
                        responseFields(dashboardBoxFields(false)));

        DashboardBox dashboardBox = new DashboardBox();
        dashboardBox.setId(1L);
        dashboardBox.setName("new box");
        dashboardBox.setOrder(99);
        dashboardBox.setWidth(Width.WIDTH_100);
        dashboardBox.setHeight(Height.HEIGHT_100);
        dashboardBox.setDescription("new box desc");
        String dashboardBoxJson = json(dashboardBox);

        mockMvc.perform(put("/rest/repository/dashboard-boxes/1")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(dashboardBoxJson))
                .andExpect(status().isOk())
                .andDo(document);

        mockMvc.perform(get("/rest/repository/dashboard-boxes/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.width", is(Width.WIDTH_100.toString())))
                .andExpect(jsonPath("$.height", is(Height.HEIGHT_100.toString())))
                .andExpect(jsonPath("$.order", is(99)))
                .andExpect(jsonPath("$.name", is("new box")))
                .andExpect(jsonPath("$.description", is("new box desc")));
    }

    /**
     * DashboardBox fields used in requests and responses.
     * An array field equivalent can be provided
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] dashboardBoxFields(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.dashboard-boxes[]").description("DashboardBox list"),
                        fieldWithPath("_embedded.dashboard-boxes[].id").description("DashboardBox's id"),
                        fieldWithPath("_embedded.dashboard-boxes[].width").description("DashboardBox's width"),
                        fieldWithPath("_embedded.dashboard-boxes[].height").description("DashboardBox's height"),
                        fieldWithPath("_embedded.dashboard-boxes[].order").description("DashboardBox's order"),
                        fieldWithPath("_embedded.dashboard-boxes[].name").description("DashboardBox's name"),
                        fieldWithPath("_embedded.dashboard-boxes[].description").description("DashboardBox's description")
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("DashboardBox's id"),
                        fieldWithPath("width").description("DashboardBox's width"),
                        fieldWithPath("height").description("DashboardBox's height"),
                        fieldWithPath("order").description("DashboardBox's order"),
                        fieldWithPath("name").description("DashboardBox's name"),
                        fieldWithPath("description").description("DashboardBox's description")
                };
    }
}
