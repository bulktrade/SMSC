package io.smsc.repository.admin;

import io.smsc.model.admin.Role;
import io.smsc.AbstractSpringMVCTest;
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
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username = "Admin", roles = {"POWER_ADMIN_USER"})
public class RoleRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleRole() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getRole");

        document
                .document(pathParameters(getPathParam("Role")),
                        responseFields(roleFields(false)));

        mockMvc.perform(get("/rest/repository/roles/1"))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("ROLE_ADMIN_USER")))
                .andDo(document);
    }

    @Test
    public void testRoleNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/roles/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllRoles() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getRoles");

        document
                .document(pathParameters(
                        parameterWithName("page").description("Page of results"),
                        parameterWithName("size").description("Size of results")),
                        responseFields(roleFields(true)));

        mockMvc.perform(get("/rest/repository/roles"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.roles", hasSize(2)))
                .andExpect(jsonPath("$._embedded.roles[0].name", is("ROLE_ADMIN_USER")))
                .andExpect(jsonPath("$._embedded.roles[1].name", is("ROLE_POWER_ADMIN_USER")))
                .andDo(document);
    }

    @Test
    public void testCreateRole() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("createRole");

        document
                .document(requestFields(roleFields(false)),
                        responseFields(roleFields(false)));

        Role role = new Role();
        role.setName("ROLE_GOD");
        String roleJson = json(role);

        this.mockMvc.perform(post("/rest/repository/roles")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(roleJson))
                .andExpect(status().isCreated())
                .andDo(document);
    }

    @Test
    public void testDeleteRole() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("deleteRole");

        document
                .document(pathParameters(getPathParam("Role")),
                        responseFields(roleFields(false)));

        mockMvc.perform(delete("/rest/repository/roles/1")
                .with(csrf()))
                .andDo(document);

        mockMvc.perform(get("/rest/repository/roles/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testReplaceRole() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("replaceRole");

        document
                .document(pathParameters(getPathParam("Role")),
                        requestFields(roleFields(false)),
                        responseFields(roleFields(false)));

        Role role = new Role();
        role.setId(1L);
        role.setName("ROLE_GOD");
        String roleJson = json(role);

        mockMvc.perform(put("/rest/repository/roles/1")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(roleJson))
                .andExpect(status().isOk())
                .andDo(document);

        mockMvc.perform(get("/rest/repository/roles/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("ROLE_GOD")));
    }

    /**
     * Role fields used in requests and responses.
     * An array field equivalent can be provided
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] roleFields(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.roles[]").description("Roles list"),
                        fieldWithPath("_embedded.roles[].id").description("Role's id"),
                        fieldWithPath("_embedded.roles[].name").description("Role's name"),
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("Role's id"),
                        fieldWithPath("name").description("Role's name")
                };
    }
}
