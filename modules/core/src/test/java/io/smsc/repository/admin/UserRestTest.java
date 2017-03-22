package io.smsc.repository.admin;

import io.smsc.model.admin.User;
import io.smsc.AbstractSpringMVCTest;
import io.smsc.model.customer.Salutation;
import org.junit.Test;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Date;

import static org.hamcrest.Matchers.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;

@WithMockUser(username = "admin", roles = {"POWER_ADMIN_USER"})
public class UserRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleAdminUser() throws Exception {
        mockMvc.perform(get("/rest/repository/users/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("user")))
                .andExpect(jsonPath("$.firstname", is("userName")))
                .andExpect(jsonPath("$.surname", is("userSurname")))
                .andExpect(jsonPath("$.email", is("user@gmail.com")))
                .andExpect(jsonPath("$.active", is(true)))
                .andExpect(jsonPath("$.blocked", is(false)))
                .andExpect(jsonPath("$.salutation", is(Salutation.MR.toString())))
                .andDo(document("getAdminUser",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("AdminUser")),
                        responseFields(adminUserFieldsForResponse(false))));
    }

    @Test
    public void testAdminUserNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/users/999")
                .contentType("application/json;charset=UTF-8"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllAdminUsers() throws Exception {
        mockMvc.perform(get("/rest/repository/users?page=0&size=20"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._embedded.users", hasSize(3)))
                .andExpect(jsonPath("$._embedded.users[0].username", is("user")))
                .andExpect(jsonPath("$._embedded.users[0].firstname", is("userName")))
                .andExpect(jsonPath("$._embedded.users[0].surname", is("userSurname")))
                .andExpect(jsonPath("$._embedded.users[0].email", is("user@gmail.com")))
                .andExpect(jsonPath("$._embedded.users[0].active", is(true)))
                .andExpect(jsonPath("$._embedded.users[0].blocked", is(false)))
                .andExpect(jsonPath("$._embedded.users[0].salutation", is(Salutation.MR.toString())))
                .andExpect(jsonPath("$._embedded.users[1].username", is("demo")))
                .andExpect(jsonPath("$._embedded.users[1].firstname", is("demoName")))
                .andExpect(jsonPath("$._embedded.users[1].surname", is("demoSurname")))
                .andExpect(jsonPath("$._embedded.users[1].email", is("demo@gmail.com")))
                .andExpect(jsonPath("$._embedded.users[1].active", is(true)))
                .andExpect(jsonPath("$._embedded.users[1].blocked", is(false)))
                .andExpect(jsonPath("$._embedded.users[1].salutation", is(Salutation.MR.toString())))
                .andExpect(jsonPath("$._embedded.users[2].username", is("admin")))
                .andExpect(jsonPath("$._embedded.users[2].firstname", is("adminName")))
                .andExpect(jsonPath("$._embedded.users[2].surname", is("adminSurname")))
                .andExpect(jsonPath("$._embedded.users[2].email", is("admin@gmail.com")))
                .andExpect(jsonPath("$._embedded.users[2].active", is(true)))
                .andExpect(jsonPath("$._embedded.users[2].blocked", is(false)))
                .andExpect(jsonPath("$._embedded.users[2].salutation", is(Salutation.MRS.toString())))
                .andDo(document("getAdminUsers",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("page").description("Page of results"),
                                parameterWithName("size").description("Size of results")),
                        responseFields(adminUserFieldsForResponse(true))));
    }

    @Test
    public void testCreateAdminUser() throws Exception {
        User user = new User();
        user.setUsername("Old Johnny");
        user.setFirstname("John");
        user.setSurname("Forrester");
        user.setEmail("john@gmail.com");
        user.setActive(true);
        user.setBlocked(false);
        user.setSalutation(Salutation.MR);
        String userJson = json(user);
        // json is ignoring password
        userJson = userJson.substring(0, userJson.length() - 1).concat(", \"password\" : \"john123456\" \r\n }");

        this.mockMvc.perform(post("/rest/repository/users")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(userJson))
                .andExpect(status().isCreated())
                .andDo(document("createAdminUser",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(adminUserFieldsForRequest()),
                        responseFields(adminUserFieldsForResponse(false))));
    }

    @Test
    public void testDeleteAdminUser() throws Exception {
        mockMvc.perform(delete("/rest/repository/users/{id}", 1)
                .with(csrf()))
                .andDo(document("deleteAdminUser",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("AdminUser"))));

        mockMvc.perform(get("/rest/repository/users/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateAdminUser() throws Exception {
        mockMvc.perform(patch("/rest/repository/users/{id}", 1)
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content("{ \"username\" : \"Old Johnny\" }"))
                .andExpect(status().isOk())
                .andDo(document("updateAdminUser",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("AdminUser")),
                        requestFields(adminUserFieldsForRequest()),
                        responseFields(adminUserFieldsForResponse(false))));

        mockMvc.perform(get("/rest/repository/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("Old Johnny")));
    }

    @Test
    public void testReplaceAdminUser() throws Exception {
        User user = new User();
        user.setId(1L);
        user.setUsername("Old Johnny");
        user.setFirstname("John");
        user.setSurname("Forrester");
        user.setEmail("john@gmail.com");
        user.setActive(false);
        user.setBlocked(true);
        user.setSalutation(Salutation.MR);
        String userJson = json(user);
        // json is ignoring password
        userJson = userJson.substring(0, userJson.length() - 1).concat(", \"password\" : \"john123456\" \r\n }");

        mockMvc.perform(put("/rest/repository/users/{id}", 1)
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(userJson))
                .andExpect(status().isOk())
                .andDo(document("replaceAdminUser",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("AdminUser")),
                        requestFields(adminUserFieldsForRequest()),
                        responseFields(adminUserFieldsForResponse(false))));

        mockMvc.perform(get("/rest/repository/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("Old Johnny")))
                .andExpect(jsonPath("$.firstname", is("John")))
                .andExpect(jsonPath("$.surname", is("Forrester")))
                .andExpect(jsonPath("$.email", is("john@gmail.com")))
                .andExpect(jsonPath("$.active", is(false)))
                .andExpect(jsonPath("$.blocked", is(true)));
    }

    /**
     * AdminUser fields used in responses.
     * An array field equivalent can be provided
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] adminUserFieldsForResponse(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.users[]").description("AdminUsers list"),
                        fieldWithPath("_embedded.users[].id").description("AdminUser's id"),
                        fieldWithPath("_embedded.users[].salutation").type(Salutation.class).description("AdminUser's salutation"),
                        fieldWithPath("_embedded.users[].username").description("AdminUser's username"),
                        fieldWithPath("_embedded.users[].firstname").description("AdminUser's firstname"),
                        fieldWithPath("_embedded.users[].surname").description("AdminUser's surname"),
                        fieldWithPath("_embedded.users[].email").description("AdminUser's email"),
                        fieldWithPath("_embedded.users[].active").description("AdminUser's active"),
                        fieldWithPath("_embedded.users[].created").description("AdminUser's created"),
                        fieldWithPath("_embedded.users[].blocked").description("AdminUser's blocked"),
                        fieldWithPath("_embedded.users[].lastModifiedDate").type(Date.class).description("AdminUser's date of last modification"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("AdminUser's id"),
                        fieldWithPath("salutation").type(Salutation.class).description("AdminUser's salutation"),
                        fieldWithPath("username").description("AdminUser's username"),
                        fieldWithPath("firstname").description("AdminUser's firstname"),
                        fieldWithPath("surname").description("AdminUser's surname"),
                        fieldWithPath("email").description("AdminUser's email"),
                        fieldWithPath("active").description("AdminUser's active"),
                        fieldWithPath("created").description("AdminUser's created"),
                        fieldWithPath("blocked").description("AdminUser's blocked"),
                        fieldWithPath("lastModifiedDate").type(Date.class).description("AdminUser's date of last modification"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };
    }

    /**
     * AdminUser fields used in requests.
     *
     * @return FieldDescriptor
     */
    private FieldDescriptor[] adminUserFieldsForRequest() {
        return new FieldDescriptor[]{
                fieldWithPath("salutation").optional().type(Salutation.class).description("AdminUser's salutation"),
                fieldWithPath("username").optional().type(String.class).description("AdminUser's username"),
                fieldWithPath("password").optional().type(String.class).description("AdminUser's password"),
                fieldWithPath("firstname").optional().type(String.class).description("AdminUser's firstname"),
                fieldWithPath("surname").optional().type(String.class).description("AdminUser's surname"),
                fieldWithPath("email").optional().type(String.class).description("AdminUser's email"),
                fieldWithPath("active").optional().type(Boolean.class).description("AdminUser's active"),
                fieldWithPath("blocked").optional().type(Boolean.class).description("AdminUser's blocked"),
                fieldWithPath("created").optional().ignored(),
                fieldWithPath("id").optional().ignored(),
                fieldWithPath("lastModifiedDate").optional().ignored(),
                fieldWithPath("_links").optional().ignored(),
                fieldWithPath("page").optional().ignored()
        };
    }
}
