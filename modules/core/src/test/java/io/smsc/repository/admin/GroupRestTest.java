package io.smsc.repository.admin;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.model.admin.Group;
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

@WithMockUser(username = "admin", roles = {"POWER_ADMIN_USER"})
public class GroupRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleGroup() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getGroup");

        document
                .document(pathParameters(getPathParam("Group")),
                        responseFields(groupFields(false)));

        mockMvc.perform(get("/rest/repository/groups/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("ADMIN_USER_ADMIN")))
                .andDo(document);
    }

    @Test
    public void testGroupNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/groups/999")
                .contentType("application/json;charset=UTF-8"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllGroups() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getGroups");

        document
                .document(pathParameters(
                        parameterWithName("page").description("Page of results"),
                        parameterWithName("size").description("Size of results")),
                        responseFields(groupFields(true)));

        mockMvc.perform(get("/rest/repository/groups"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._embedded.groups", hasSize(20)))
                .andExpect(jsonPath("$._embedded.groups[0].name", is("ADMIN_USER_ADMIN")))
                .andExpect(jsonPath("$._embedded.groups[19].name", is("ADMIN_USER_ROLE_READ_ONLY")))
                .andDo(document);

    }

    @Test
    public void testCreateGroup() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("createGroup");

        document
                .document(requestFields(groupFields(false)),
                        responseFields(groupFields(false)));

        Group group = new Group();
        group.setName("GROUP_ALL_RIGHTS");

        this.mockMvc.perform(post("/rest/repository/groups")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(json(group)))
                .andExpect(status().isCreated())
                .andDo(document);
    }

    @Test
    public void testDeleteUser() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("deleteGroup");

        document
                .document(pathParameters(getPathParam("Group")),
                        responseFields(groupFields(false)));

        mockMvc.perform(delete("/rest/repository/groups/1")
                .with(csrf()))
                .andDo(document);

        mockMvc.perform(get("/rest/repository/groups/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testReplaceUser() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("replaceGroup");

        document
                .document(pathParameters(getPathParam("Group")),
                        requestFields(groupFields(false)),
                        responseFields(groupFields(false)));

        Group group = new Group();
        group.setId(2L);
        group.setName("GROUP_ALL_RIGHTS");

        mockMvc.perform(put("/rest/repository/groups/2")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(json(group)))
                .andExpect(status().isOk())
                .andDo(document);

        mockMvc.perform(get("/rest/repository/groups/2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("GROUP_ALL_RIGHTS")));
    }

    /**
     * Group fields used in requests and responses.
     * An array field equivalent can be provided
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] groupFields(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.groups[]").description("Groups list"),
                        fieldWithPath("_embedded.groups[].id").description("Group's id"),
                        fieldWithPath("_embedded.groups[].name").description("Group's name"),
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("Group's id"),
                        fieldWithPath("name").description("Group's name")
                };
    }
}
