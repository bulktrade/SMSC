package io.smsc.repository.admin;

import io.smsc.model.admin.Role;
import io.smsc.AbstractSpringMVCTest;
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
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username = "Admin", roles = {"POWER_ADMIN_USER"})
public class RoleRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleRole() throws Exception {

        mockMvc.perform(get("/rest/repository/roles/{id}", 1))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("ROLE_ADMIN_USER")))
                .andDo(document("getRole",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Role")),
                        responseFields(roleFieldsForResponse(false))));
    }

    @Test
    public void testRoleNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/roles/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllRoles() throws Exception {
        mockMvc.perform(get("/rest/repository/roles?page=0&size=5"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.roles", hasSize(2)))
                .andExpect(jsonPath("$._embedded.roles[0].name", is("ROLE_ADMIN_USER")))
                .andExpect(jsonPath("$._embedded.roles[1].name", is("ROLE_POWER_ADMIN_USER")))
                .andDo(document("getRoles",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("page").description("Page of results"),
                                parameterWithName("size").description("Size of results")),
                        responseFields(roleFieldsForResponse(true))));
    }

    @Test
    public void testCreateRole() throws Exception {
        Role role = new Role();
        role.setName("ROLE_GOD");
        String roleJson = json(role);

        this.mockMvc.perform(post("/rest/repository/roles")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(roleJson))
                .andExpect(status().isCreated())
                .andDo(document("createRole",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(roleFieldsForRequest(false)),
                        responseFields(roleFieldsForResponse(false))));
    }

    @Test
    public void testDeleteRole() throws Exception {
        mockMvc.perform(delete("/rest/repository/roles/{id}", 1)
                .with(csrf()))
                .andDo(document("deleteRole",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Role"))));

        mockMvc.perform(get("/rest/repository/roles/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateRole() throws Exception {
        mockMvc.perform(patch("/rest/repository/roles/{id}", 1)
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content("{ \"name\" : \"ROLE_GOD\" }"))
                .andExpect(status().isOk())
                .andDo(document("updateRole",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Role")),
                        requestFields(roleFieldsForRequest(true)),
                        responseFields(roleFieldsForResponse(false))));

        mockMvc.perform(get("/rest/repository/roles/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("ROLE_GOD")));
    }

    @Test
    public void testReplaceRole() throws Exception {
        Role role = new Role();
        role.setId(1L);
        role.setName("ROLE_GOD");
        String roleJson = json(role);

        mockMvc.perform(put("/rest/repository/roles/{id}", 1)
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(roleJson))
                .andExpect(status().isOk())
                .andDo(document("replaceRole",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Role")),
                        requestFields(roleFieldsForRequest(false)),
                        responseFields(roleFieldsForResponse(false))));

        mockMvc.perform(get("/rest/repository/roles/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("ROLE_GOD")));
    }

    /**
     * Role fields used in responses.
     * An array field equivalent can be provided.
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] roleFieldsForResponse(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.roles[]").description("Roles list"),
                        fieldWithPath("_embedded.roles[].id").description("Role's id"),
                        fieldWithPath("_embedded.roles[].name").description("Role's name"),
                        fieldWithPath("_embedded.roles[].lastModifiedDate").type(Date.class).description("Role's date of last modification"),
                        fieldWithPath("_embedded.roles[].createdDate").type(Date.class).description("Role's creation date"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("Role's id"),
                        fieldWithPath("name").description("Role's name"),
                        fieldWithPath("lastModifiedDate").type(Date.class).description("Role's date of last modification"),
                        fieldWithPath("createdDate").type(Date.class).description("Role's creation date"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };
    }

    /**
     * Role fields used in requests.
     *
     * @return FieldDescriptor
     */
    private FieldDescriptor[] roleFieldsForRequest(boolean isPatchRequest) {
        return isPatchRequest ?
                new FieldDescriptor[]{
                        fieldWithPath("name").optional().type(String.class).description("Role's name")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("id").optional().ignored(),
                        fieldWithPath("lastModifiedDate").optional().ignored(),
                        fieldWithPath("createdDate").optional().ignored(),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                } :
                new FieldDescriptor[]{
                        fieldWithPath("name").type(String.class).description("Role's name")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("id").optional().ignored(),
                        fieldWithPath("lastModifiedDate").optional().ignored(),
                        fieldWithPath("createdDate").optional().ignored(),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };
    }
}
