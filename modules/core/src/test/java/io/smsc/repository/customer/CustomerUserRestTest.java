package io.smsc.repository.customer;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.model.customer.Salutation;
import io.smsc.model.customer.User;
import org.junit.Test;
import org.springframework.restdocs.mockmvc.RestDocumentationResultHandler;
import org.springframework.restdocs.payload.FieldDescriptor;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WithMockUser(username = "Admin", roles = {"POWER_ADMIN_USER"})
public class CustomerUserRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleCustomerUser() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getCustomerUser");

        document
                .document(pathParameters(getPathParam("CustomerUser")),
                        responseFields(customerUserFields(false)));

        mockMvc.perform(get("/rest/repository/customer-users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("user")))
                .andExpect(jsonPath("$.firstname", is("userName")))
                .andExpect(jsonPath("$.surname", is("userSurname")))
                .andExpect(jsonPath("$.email", is("user@gmail.com")))
                .andExpect(jsonPath("$.active", is(true)))
                .andExpect(jsonPath("$.blocked", is(false)))
                .andDo(document);
    }

    @Test
    public void testCustomerUserNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/customer-users/999")
                .contentType("application/json;charset=UTF-8"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllCustomerUsers() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getCustomerUsers");

        document
                .document(pathParameters(
                        parameterWithName("page").description("Page of results"),
                        parameterWithName("size").description("Size of results")),
                        responseFields(customerUserFields(true)));

        mockMvc.perform(get("/rest/repository/customer-users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._embedded.customer-users", hasSize(2)))
                .andExpect(jsonPath("$._embedded.customer-users[0].username", is("user")))
                .andExpect(jsonPath("$._embedded.customer-users[0].firstname", is("userName")))
                .andExpect(jsonPath("$._embedded.customer-users[0].surname", is("userSurname")))
                .andExpect(jsonPath("$._embedded.customer-users[0].email", is("user@gmail.com")))
                .andExpect(jsonPath("$._embedded.customer-users[0].active", is(true)))
                .andExpect(jsonPath("$._embedded.customer-users[0].blocked", is(false)))
                .andExpect(jsonPath("$._embedded.customer-users[1].username", is("admin")))
                .andExpect(jsonPath("$._embedded.customer-users[1].firstname", is("adminName")))
                .andExpect(jsonPath("$._embedded.customer-users[1].surname", is("adminSurname")))
                .andExpect(jsonPath("$._embedded.customer-users[1].email", is("admin@gmail.com")))
                .andExpect(jsonPath("$._embedded.customer-users[1].active", is(true)))
                .andExpect(jsonPath("$._embedded.customer-users[1].blocked", is(false)))
                .andDo(document);
    }

    @Test
    public void testCreateCustomerUser() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("createCustomerUser");

        FieldDescriptor[] fieldsWithPassword = new FieldDescriptor[]{
                fieldWithPath("id").description("CustomerUser's id"),
                fieldWithPath("salutation").description("CustomerUser's salutation"),
                fieldWithPath("username").description("CustomerUser's username"),
                fieldWithPath("password").description("CustomerUser's password"),
                fieldWithPath("firstname").description("CustomerUser's firstname"),
                fieldWithPath("surname").description("CustomerUser's surname"),
                fieldWithPath("email").description("CustomerUser's email"),
                fieldWithPath("active").description("CustomerUser's active"),
                fieldWithPath("created").description("CustomerUser's created"),
                fieldWithPath("blocked").description("CustomerUser's blocked")
        };

        document
                .document(requestFields(fieldsWithPassword),
                        responseFields(customerUserFields(false)));

        User user = new User();
        user.setUsername("Old Johnny");
        user.setFirstname("John");
        user.setSurname("Forrester");
        user.setEmail("john@gmail.com");
        user.setActive(true);
        user.setBlocked(false);
        user.setSalutation(Salutation.MR);
        String customerUserJson = json(user);
        // json is ignoring inserting password and customer through setter
        customerUserJson = customerUserJson.substring(0, customerUserJson.length() - 1).concat(", \"password\" : \"john123456\", \"customer\" : \"rest/repository/customers/40000\" \r\n }");

        mockMvc.perform(post("/rest/repository/users")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(customerUserJson))
                .andExpect(status().isCreated())
                .andDo(document);
    }

    @Test
    public void testDeleteCustomerUser() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("deleteCustomerUser");

        document
                .document(pathParameters(getPathParam("CustomerUser")),
                        responseFields(customerUserFields(false)));

        mockMvc.perform(delete("/rest/repository/customer-users/1")
                .with(csrf()))
                .andDo(document);

        mockMvc.perform(get("/rest/repository/customer-users/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testReplaceCustomerUser() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("replaceCustomerUser");

        document
                .document(pathParameters(getPathParam("CustomerUser")),
                        requestFields(customerUserFields(false)),
                        responseFields(customerUserFields(false)));

        User user = new User();
        user.setId(1L);
        user.setUsername("Old Johnny");
        user.setFirstname("John");
        user.setSurname("Forrester");
        user.setEmail("john@gmail.com");
        user.setActive(false);
        user.setBlocked(true);
        user.setSalutation(Salutation.MR);
        String customerUserJson = json(user);
        // json is ignoring password
        customerUserJson = customerUserJson.substring(0, customerUserJson.length() - 1).concat(", \"password\" : \"john123456\" \r\n }");

        mockMvc.perform(put("/rest/repository/customer-users/1")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(customerUserJson))
                .andExpect(status().isOk())
                .andDo(document);

        mockMvc.perform(get("/rest/repository/customer-users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("Old Johnny")))
                .andExpect(jsonPath("$.firstname", is("John")))
                .andExpect(jsonPath("$.surname", is("Forrester")))
                .andExpect(jsonPath("$.email", is("john@gmail.com")))
                .andExpect(jsonPath("$.active", is(false)))
                .andExpect(jsonPath("$.blocked", is(true)));
    }

    /**
     * CustomerUser fields used in requests and responses.
     * An array field equivalent can be provided
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] customerUserFields(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.customer-users[]").description("CustomerUsers list"),
                        fieldWithPath("_embedded.customer-users[].id").description("CustomerUser's id"),
                        fieldWithPath("_embedded.customer-users[].salutation").description("CustomerUser's salutation"),
                        fieldWithPath("_embedded.customer-users[].username").description("CustomerUser's username"),
                        fieldWithPath("_embedded.customer-users[].firstname").description("CustomerUser's firstname"),
                        fieldWithPath("_embedded.customer-users[].surname").description("CustomerUser's surname"),
                        fieldWithPath("_embedded.customer-users[].email").description("CustomerUser's email"),
                        fieldWithPath("_embedded.customer-users[].active").description("CustomerUser's active"),
                        fieldWithPath("_embedded.customer-users[].created").description("CustomerUser's created"),
                        fieldWithPath("_embedded.customer-users [].blocked").description("CustomerUser's blocked"),
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("CustomerUser's id"),
                        fieldWithPath("salutation").description("CustomerUser's salutation"),
                        fieldWithPath("username").description("CustomerUser's username"),
                        fieldWithPath("firstname").description("CustomerUser's firstname"),
                        fieldWithPath("surname").description("CustomerUser's surname"),
                        fieldWithPath("email").description("CustomerUser's email"),
                        fieldWithPath("active").description("CustomerUser's active"),
                        fieldWithPath("created").description("CustomerUser's created"),
                        fieldWithPath("blocked").description("CustomerUser's blocked")
                };
    }
}
