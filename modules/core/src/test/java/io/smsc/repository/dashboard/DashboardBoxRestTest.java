package io.smsc.repository.dashboard;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.model.dashboard.*;
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
public class DashboardBoxRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleDashboardBox() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-boxes/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.width", is(Width.WIDTH_25.toString())))
                .andExpect(jsonPath("$.height", is(Height.HEIGHT_25.toString())))
                .andExpect(jsonPath("$.order", is(1)))
                .andExpect(jsonPath("$.name", is("Box 1")))
                .andExpect(jsonPath("$.description", is("Box 1 desc")))
                .andDo(document("getDashboardBox",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("DashboardBox")),
                        responseFields(dashboardBoxFieldsForResponse(false))));
    }

    @Test
    public void testDashboardBoxNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-boxes/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllDashboardBoxes() throws Exception {
        mockMvc.perform(get("/rest/repository/dashboard-boxes?page=0&size=5"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.dashboard-boxes", hasSize(5)))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[0].width", is(Width.WIDTH_25.toString())))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[0].height", is(Height.HEIGHT_25.toString())))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[0].order", is(1)))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[0].name", is("Box 1")))
                .andExpect(jsonPath("$._embedded.dashboard-boxes[0].description", is("Box 1 desc")))
                .andDo(document("getDashboardBoxes",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("page").description("Page of results"),
                                parameterWithName("size").description("Size of results")),
                        responseFields(dashboardBoxFieldsForResponse(true))));
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
        dashboardBoxJson = dashboardBoxJson.substring(0, dashboardBoxJson.length() - 1)
                .concat(", \"dashboard\" : \"/rest/repository/dashboards/1\", \r\n " +
                        "\"dashboardBoxType\" : \"/rest/repository/dashboard-box-types/1\" }");

        this.mockMvc.perform(post("/rest/repository/dashboard-boxes")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(dashboardBoxJson))
                .andExpect(status().isCreated())
                .andDo(document("createDashboardBox",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(dashboardFieldsForRequest(false)),
                        responseFields(dashboardBoxFieldsForResponse(false))));
    }

    @Test
    public void testDeleteDashboardBox() throws Exception {
        mockMvc.perform(delete("/rest/repository/dashboard-boxes/{id}", 1)
                .with(csrf()))
                .andDo(document("deleteDashboardBox",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("DashboardBox"))));

        mockMvc.perform(get("/rest/repository/dashboard-boxes/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateDashboardBox() throws Exception {
        mockMvc.perform(patch("/rest/repository/dashboard-boxes/{id}", 1)
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content("{ \"name\" : \"new box\" }"))
                .andExpect(status().isOk())
                .andDo(document("updateDashboardBox",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("DashboardBox")),
                        requestFields(dashboardFieldsForRequest(true)),
                        responseFields(dashboardBoxFieldsForResponse(false))));

        mockMvc.perform(get("/rest/repository/dashboard-boxes/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("new box")));
    }

    @Test
    public void testReplaceDashboardBox() throws Exception {
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
                .contentType("application/json;charset=UTF-8")
                .content(dashboardBoxJson))
                .andExpect(status().isOk())
                .andDo(document("replaceDashboardBox",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("DashboardBox")),
                        requestFields(dashboardFieldsForRequest(false)),
                        responseFields(dashboardBoxFieldsForResponse(false))));

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
     * DashboardBox fields used in responses.
     * An array field equivalent can be provided
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] dashboardBoxFieldsForResponse(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.dashboard-boxes[]").description("DashboardBox list"),
                        fieldWithPath("_embedded.dashboard-boxes[].id").description("DashboardBox's id"),
                        fieldWithPath("_embedded.dashboard-boxes[].width").description("DashboardBox's width"),
                        fieldWithPath("_embedded.dashboard-boxes[].height").description("DashboardBox's height"),
                        fieldWithPath("_embedded.dashboard-boxes[].order").description("DashboardBox's order"),
                        fieldWithPath("_embedded.dashboard-boxes[].name").description("DashboardBox's name"),
                        fieldWithPath("_embedded.dashboard-boxes[].description")
                                .description("DashboardBox's description"),
                        fieldWithPath("_embedded.dashboard-boxes[].lastModifiedDate").type(Date.class)
                                .description("DashboardBox's date of last modification"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("DashboardBox's id"),
                        fieldWithPath("width").description("DashboardBox's width"),
                        fieldWithPath("height").description("DashboardBox's height"),
                        fieldWithPath("order").description("DashboardBox's order"),
                        fieldWithPath("name").description("DashboardBox's name"),
                        fieldWithPath("description").description("DashboardBox's description"),
                        fieldWithPath("lastModifiedDate").type(Date.class)
                                .description("DashboardBox's date of last modification"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };
    }

    /**
     * DashboardBox fields used in requests.
     *
     * @return FieldDescriptor
     */
    private FieldDescriptor[] dashboardFieldsForRequest(boolean isPatchRequest) {
        return isPatchRequest ?
                new FieldDescriptor[]{
                        fieldWithPath("width").optional().type(Width.class).description("DashboardBox's width")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("height").optional().type(Height.class).description("DashboardBox's height")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("order").optional().type(Number.class).description("DashboardBox's order")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("name").optional().type(String.class).description("DashboardBox's name")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("description").optional().type(String.class).description("DashboardBox's description")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("dashboard").optional().type(Dashboard.class).description("DashboardBox's dashboard")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("dashboardBoxType").optional().type(DashboardBoxType.class).description("DashboardBox's dashboardBoxType")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("id").optional().ignored(),
                        fieldWithPath("lastModifiedDate").optional().ignored(),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                } :
                new FieldDescriptor[]{
                        fieldWithPath("width").type(Width.class).description("DashboardBox's width")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("height").type(Height.class).description("DashboardBox's height")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("order").type(Number.class).description("DashboardBox's order")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("name").type(String.class).description("DashboardBox's name")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("description").type(String.class).description("DashboardBox's description")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("dashboard").type(Dashboard.class).description("DashboardBox's dashboard")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("dashboardBoxType").type(DashboardBoxType.class).description("DashboardBox's dashboardBoxType")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("id").optional().ignored(),
                        fieldWithPath("lastModifiedDate").optional().ignored(),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };
    }
}
