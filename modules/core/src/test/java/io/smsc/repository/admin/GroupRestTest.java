package io.smsc.repository.admin;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.model.admin.Group;
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

@WithMockUser(username = "admin", roles = {"POWER_ADMIN_USER"})
public class GroupRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleGroup() throws Exception {
        mockMvc.perform(get("/rest/repository/groups/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("ADMIN_USER_ADMIN")))
                .andDo(document("getGroup",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Group")),
                        responseFields(groupFieldsForResponse(false))));
    }

    @Test
    public void testGroupNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/groups/999")
                .contentType("application/json;charset=UTF-8"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllGroups() throws Exception {
        mockMvc.perform(get("/rest/repository/groups?page=0&size=5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._embedded.groups", hasSize(5)))
                .andExpect(jsonPath("$._embedded.groups[0].name", is("ADMIN_USER_ADMIN")))
                .andDo(document("getGroups",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("page").description("Page of results"),
                                parameterWithName("size").description("Size of results")),
                        responseFields(groupFieldsForResponse(true))));

    }

    @Test
    public void testCreateGroup() throws Exception {
        Group group = new Group();
        group.setName("GROUP_ALL_RIGHTS");

        this.mockMvc.perform(post("/rest/repository/groups")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(json(group)))
                .andExpect(status().isCreated())
                .andDo(document("createGroup",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(groupFieldsForRequest(false)),
                        responseFields(groupFieldsForResponse(false))));
    }

    @Test
    public void testDeleteGroup() throws Exception {
        mockMvc.perform(delete("/rest/repository/groups/{id}", 1)
                .with(csrf()))
                .andDo(document("deleteGroup",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Group"))));

        mockMvc.perform(get("/rest/repository/groups/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateGroup() throws Exception {
        mockMvc.perform(patch("/rest/repository/groups/{id}", 1)
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content("{ \"name\" : \"GROUP_ALL_RIGHTS\" }"))
                .andExpect(status().isOk())
                .andDo(document("updateGroup",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Group")),
                        requestFields(groupFieldsForRequest(true)),
                        responseFields(groupFieldsForResponse(false))));

        mockMvc.perform(get("/rest/repository/groups/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("GROUP_ALL_RIGHTS")));
    }

    @Test
    public void testReplaceGroup() throws Exception {
        Group group = new Group();
        group.setId(2L);
        group.setName("GROUP_ALL_RIGHTS");

        mockMvc.perform(put("/rest/repository/groups/{id}", 2)
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(json(group)))
                .andExpect(status().isOk())
                .andDo(document("replaceGroup",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Group")),
                        requestFields(groupFieldsForRequest(false)),
                        responseFields(groupFieldsForResponse(false))));

        mockMvc.perform(get("/rest/repository/groups/2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("GROUP_ALL_RIGHTS")));
    }

    /**
     * Group fields used in responses.
     * An array field equivalent can be provided.
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] groupFieldsForResponse(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.groups[]").description("Groups list"),
                        fieldWithPath("_embedded.groups[].id").description("Group's id"),
                        fieldWithPath("_embedded.groups[].name").description("Group's name"),
                        fieldWithPath("_embedded.groups[].lastModifiedDate").type(Date.class).description("Group's date of last modification"),
                        fieldWithPath("_embedded.groups[].createdDate").type(Date.class).description("Group's creation date"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("Group's id"),
                        fieldWithPath("name").description("Group's name"),
                        fieldWithPath("lastModifiedDate").type(Date.class).description("Group's date of last modification"),
                        fieldWithPath("createdDate").type(Date.class).description("Group's creation date"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };
    }

    /**
     * Group fields used in requests.
     *
     * @return FieldDescriptor
     */
    private FieldDescriptor[] groupFieldsForRequest(boolean isPatchRequest) {
        return isPatchRequest ?
                new FieldDescriptor[]{
                        fieldWithPath("name").optional().type(String.class).description("Group's name")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("id").optional().ignored(),
                        fieldWithPath("lastModifiedDate").optional().ignored(),
                        fieldWithPath("createdDate").optional().ignored(),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                } :
                new FieldDescriptor[]{
                        fieldWithPath("name").type(String.class).description("Group's name")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("id").optional().ignored(),
                        fieldWithPath("lastModifiedDate").optional().ignored(),
                        fieldWithPath("createdDate").optional().ignored(),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };
    }
}
