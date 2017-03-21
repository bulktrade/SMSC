package io.smsc.repository.admin;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.model.admin.Authority;
import io.smsc.model.admin.Role;
import org.junit.Test;
import org.springframework.restdocs.mockmvc.RestDocumentationResultHandler;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.request.ParameterDescriptor;
import org.springframework.security.test.context.support.WithMockUser;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username = "admin", roles = {"POWER_ADMIN_USER"})
public class AuthorityRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleAuthority() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getAuthority");

        document
                .document(pathParameters(getPathParam("Authority")),
                        responseFields(authorityFields(false)));

        mockMvc.perform(get("/rest/repository/authorities/1"))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("ADMIN_USER_READ")))
                .andDo(document);
    }

    @Test
    public void testAuthorityNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/authorities/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllAuthorities() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getAuthorities");

        document
                .document(pathParameters(
                        parameterWithName("page").description("Page of results"),
                        parameterWithName("size").description("Size of results")),
                        responseFields(authorityFields(true)));

        mockMvc.perform(get("/rest/repository/authorities"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.authorities", hasSize(20)))
                .andExpect(jsonPath("$._embedded.authorities[0].name", is("ADMIN_USER_READ")))
                .andExpect(jsonPath("$._embedded.authorities[19].name", is("DASHBOARD_WRITE")))
                .andDo(document);
    }

    @Test
    public void testCreateAuthority() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("createAuthority");

        document
                .document(requestFields(authorityFields(false)),
                        responseFields(authorityFields(false)));

        Authority authority = new Authority();
        authority.setName("NEW_AUTHORITY");
        String authorityJson = json(authority);

        this.mockMvc.perform(post("/rest/repository/authorities")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(authorityJson))
                .andExpect(status().isCreated())
                .andDo(document);
    }

    @Test
    public void testDeleteAuthority() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("deleteAuthority");

        document
                .document(pathParameters(getPathParam("Authority")),
                        responseFields(authorityFields(false)));

        mockMvc.perform(delete("/rest/repository/authorities/1")
                .with(csrf()))
                .andDo(document);

        mockMvc.perform(get("/rest/repository/authorities/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testReplaceAuthority() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("replaceAuthority");

        document
                .document(pathParameters(getPathParam("Authority")),
                        requestFields(authorityFields(false)),
                        responseFields(authorityFields(false)));

        Role role = new Role();
        role.setId(1L);
        role.setName("NEW_AUTHORITY");
        String authorityJson = json(role);

        mockMvc.perform(put("/rest/repository/authorities/1")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(authorityJson))
                .andExpect(status().isOk())
                .andDo(document);

        mockMvc.perform(get("/rest/repository/authorities/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("NEW_AUTHORITY")));
    }

    /**
     * Authority fields used in requests and responses.
     * An array field equivalent can be provided
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] authorityFields(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.authorities[]").description("Authorities list"),
                        fieldWithPath("_embedded.authorities[].id").description("Authority's id"),
                        fieldWithPath("_embedded.authorities[].name").description("Authority's name"),
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("Authority's id"),
                        fieldWithPath("name").description("Authority's name")
                };
    }
}
