package io.smsc.repository.admin;

import io.smsc.model.admin.User;
import io.smsc.AbstractSpringMVCTest;
import io.smsc.model.customer.Salutation;
import org.junit.Test;
import org.springframework.restdocs.mockmvc.RestDocumentationResultHandler;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.security.test.context.support.WithMockUser;

import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;

@WithMockUser(username = "admin", roles = {"POWER_ADMIN_USER"})
public class UserRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleUser() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getAdminUser");

        document
                .document(pathParameters(getPathParam("AdminUser")),
                        responseFields(adminUserFields(false)));

        mockMvc.perform(get("/rest/repository/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("user")))
                .andExpect(jsonPath("$.firstname", is("userName")))
                .andExpect(jsonPath("$.surname", is("userSurname")))
                .andExpect(jsonPath("$.email", is("user@gmail.com")))
                .andExpect(jsonPath("$.active", is(true)))
                .andExpect(jsonPath("$.blocked", is(false)))
                .andExpect(jsonPath("$.salutation", is(Salutation.MR.toString())))
                .andDo(document);
    }

    @Test
    public void testUserNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/users/999")
                .contentType("application/json;charset=UTF-8"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllUsers() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getAdminUsers");

        document
                .document(pathParameters(
                        parameterWithName("page").description("Page of results"),
                        parameterWithName("size").description("Size of results")),
                        responseFields(adminUserFields(true)));

        mockMvc.perform(get("/rest/repository/users"))
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
                .andDo(document);
    }

    @Test
    public void testCreateUser() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("createAdminUser");

        FieldDescriptor[] fieldsWithPassword = new FieldDescriptor[]{
                fieldWithPath("id").description("AdminUser's id"),
                fieldWithPath("salutation").description("AdminUser's salutation"),
                fieldWithPath("username").description("AdminUser's username"),
                fieldWithPath("password").description("AdminUser's password"),
                fieldWithPath("firstname").description("AdminUser's firstname"),
                fieldWithPath("surname").description("AdminUser's surname"),
                fieldWithPath("email").description("AdminUser's email"),
                fieldWithPath("active").description("AdminUser's active"),
                fieldWithPath("created").description("AdminUser's created"),
                fieldWithPath("blocked").description("AdminUser's blocked")
        };

        document
                .document(requestFields(fieldsWithPassword),
                        responseFields(adminUserFields(false)));

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
                .andDo(document);
    }

    @Test
    public void testDeleteUser() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("deleteAdminUser");

        document
                .document(pathParameters(getPathParam("AdminUser")),
                        responseFields(adminUserFields(false)));

        mockMvc.perform(delete("/rest/repository/users/1")
                .with(csrf()))
                .andDo(document);

        mockMvc.perform(get("/rest/repository/users/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testReplaceUser() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("replaceAdminUser");

        document
                .document(pathParameters(getPathParam("AdminUser")),
                        requestFields(adminUserFields(false)),
                        responseFields(adminUserFields(false)));

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

        mockMvc.perform(put("/rest/repository/users/1")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(userJson))
                .andExpect(status().isOk())
                .andDo(document);

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
     * AdminUser fields used in requests and responses.
     * An array field equivalent can be provided
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] adminUserFields(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.users[]").description("AdminUsers list"),
                        fieldWithPath("_embedded.users[].id").description("AdminUser's id"),
                        fieldWithPath("_embedded.users[].salutation").description("AdminUser's salutation"),
                        fieldWithPath("_embedded.users[].username").description("AdminUser's username"),
                        fieldWithPath("_embedded.users[].firstname").description("AdminUser's firstname"),
                        fieldWithPath("_embedded.users[].surname").description("AdminUser's surname"),
                        fieldWithPath("_embedded.users[].email").description("AdminUser's email"),
                        fieldWithPath("_embedded.users[].active").description("AdminUser's active"),
                        fieldWithPath("_embedded.users[].created").description("AdminUser's created"),
                        fieldWithPath("_embedded.users[].blocked").description("AdminUser's blocked"),
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("AdminUser's id"),
                        fieldWithPath("salutation").description("AdminUser's salutation"),
                        fieldWithPath("username").description("AdminUser's username"),
                        fieldWithPath("firstname").description("AdminUser's firstname"),
                        fieldWithPath("surname").description("AdminUser's surname"),
                        fieldWithPath("email").description("AdminUser's email"),
                        fieldWithPath("active").description("AdminUser's active"),
                        fieldWithPath("created").description("AdminUser's created"),
                        fieldWithPath("blocked").description("AdminUser's blocked")
                };
    }
}
