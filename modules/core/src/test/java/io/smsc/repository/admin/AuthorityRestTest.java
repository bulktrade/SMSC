package io.smsc.repository.admin;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.model.admin.Authority;
import org.junit.Test;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.security.test.context.support.WithMockUser;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username = "admin", roles = {"POWER_ADMIN_USER"})
public class AuthorityRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleAuthority() throws Exception {
        mockMvc.perform(get("/rest/repository/authorities/{id}", 1))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("ADMIN_USER_READ")))
                .andDo(document("getAuthority",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Authority")),
                        responseFields(authorityFieldsForResponse(false))));
    }

    @Test
    public void testAuthorityNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/authorities/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllAuthorities() throws Exception {
        mockMvc.perform(get("/rest/repository/authorities?page=0&size=20"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.authorities", hasSize(20)))
                .andExpect(jsonPath("$._embedded.authorities[0].name", is("ADMIN_USER_READ")))
                .andExpect(jsonPath("$._embedded.authorities[19].name", is("DASHBOARD_WRITE")))
                .andDo(document("getAuthorities",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("page").description("Page of results"),
                                parameterWithName("size").description("Size of results")),
                        responseFields(authorityFieldsForResponse(true))));
    }

    @Test
    public void testCreateAuthority() throws Exception {
        Authority authority = new Authority();
        authority.setName("NEW_AUTHORITY");
        String authorityJson = json(authority);

        this.mockMvc.perform(post("/rest/repository/authorities")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(authorityJson))
                .andExpect(status().isCreated())
                .andDo(document("createAuthority",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(authorityFieldsForRequest()),
                        responseFields(authorityFieldsForResponse(false))));
    }

    @Test
    public void testDeleteAuthority() throws Exception {
        mockMvc.perform(delete("/rest/repository/authorities/{id}",1)
                .with(csrf()))
                .andExpect(status().isNoContent())
                .andDo(document("deleteAuthority",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Authority"))));

        mockMvc.perform(get("/rest/repository/authorities/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateAuthority() throws Exception {
        mockMvc.perform(patch("/rest/repository/authorities/{id}", 1)
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content("{ \"name\" : \"NEW_AUTHORITY\" }"))
                .andExpect(status().isOk())
                .andDo(document("updateAuthority",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Authority")),
                        requestFields(authorityFieldsForRequest()),
                        responseFields(authorityFieldsForResponse(false))));

        mockMvc.perform(get("/rest/repository/authorities/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("NEW_AUTHORITY")));
    }

    @Test
    public void testReplaceAuthority() throws Exception {
        Authority authority = new Authority();
        authority.setId(1L);
        authority.setName("NEW_AUTHORITY");
        String authorityJson = json(authority);

        mockMvc.perform(put("/rest/repository/authorities/{id}", 1)
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(authorityJson))
                .andExpect(status().isOk())
                .andDo(document("replaceAuthority",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Authority")),
                        requestFields(authorityFieldsForRequest()),
                        responseFields(authorityFieldsForResponse(false))));

        mockMvc.perform(get("/rest/repository/authorities/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is("NEW_AUTHORITY")));
    }

    /**
     * Authority fields used in responses.
     * An array field equivalent can be provided.
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] authorityFieldsForResponse(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.authorities[]").description("Authorities list"),
                        fieldWithPath("_embedded.authorities[].id").description("Authority's id"),
                        fieldWithPath("_embedded.authorities[].name").description("Authority's name"),
                        fieldWithPath("_embedded.authorities[].lastModifiedDate").description("Authority's date of last modification"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("Authority's id"),
                        fieldWithPath("name").description("Authority's name"),
                        fieldWithPath("lastModifiedDate").description("Authority's date of last modification"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };
    }

    /**
     * Authority fields used in requests.
     *
     * @return FieldDescriptor
     */
    private FieldDescriptor[] authorityFieldsForRequest() {
        return new FieldDescriptor[]{
                fieldWithPath("name").optional().type(String.class).description("Authority's name"),
                fieldWithPath("id").optional().ignored(),
                fieldWithPath("lastModifiedDate").optional().ignored(),
                fieldWithPath("_links").optional().ignored(),
                fieldWithPath("page").optional().ignored()
                };
    }
}
