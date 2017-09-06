package io.smsc.repository.customer;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.Salutation;
import io.smsc.model.customer.User;
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
public class CustomerUserRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleCustomerUser() throws Exception {
        mockMvc.perform(get("/rest/repository/customer-users/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("user")))
                .andExpect(jsonPath("$.firstname", is("userName")))
                .andExpect(jsonPath("$.surname", is("userSurname")))
                .andExpect(jsonPath("$.email", is("user@gmail.com")))
                .andExpect(jsonPath("$.active", is(true)))
                .andExpect(jsonPath("$.blocked", is(false)))
                .andExpect(jsonPath("$.salutation", is(Salutation.MR.toString())))
                .andDo(document("getCustomerUser",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("CustomerUser")),
                        responseFields(customerUserFieldsForResponse(false))));
    }

    @Test
    public void testCustomerUserNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/customer-users/999")
                .contentType("application/json;charset=UTF-8"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllCustomerUsers() throws Exception {
        mockMvc.perform(get("/rest/repository/customer-users?page=0&size=5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._embedded.customer-users", hasSize(2)))
                .andExpect(jsonPath("$._embedded.customer-users[0].username", is("user")))
                .andExpect(jsonPath("$._embedded.customer-users[0].firstname", is("userName")))
                .andExpect(jsonPath("$._embedded.customer-users[0].surname", is("userSurname")))
                .andExpect(jsonPath("$._embedded.customer-users[0].email", is("user@gmail.com")))
                .andExpect(jsonPath("$._embedded.customer-users[0].active", is(true)))
                .andExpect(jsonPath("$._embedded.customer-users[0].blocked", is(false)))
                .andExpect(jsonPath("$._embedded.customer-users[0].salutation", is(Salutation.MR.toString())))
                .andExpect(jsonPath("$._embedded.customer-users[1].username", is("admin")))
                .andExpect(jsonPath("$._embedded.customer-users[1].firstname", is("adminName")))
                .andExpect(jsonPath("$._embedded.customer-users[1].surname", is("adminSurname")))
                .andExpect(jsonPath("$._embedded.customer-users[1].email", is("admin@gmail.com")))
                .andExpect(jsonPath("$._embedded.customer-users[1].active", is(true)))
                .andExpect(jsonPath("$._embedded.customer-users[1].blocked", is(false)))
                .andExpect(jsonPath("$._embedded.customer-users[1].salutation", is(Salutation.MRS.toString())))
                .andDo(document("getCustomerUsers",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("page").description("Page of results"),
                                parameterWithName("size").description("Size of results")),
                        responseFields(customerUserFieldsForResponse(true))));
    }

    @Test
    public void testCreateCustomerUser() throws Exception {
        User user = new User();
        user.setUsername("Old Johnny");
        user.setFirstname("John");
        user.setSurname("Forrester");
        user.setEmail("john@gmail.com");
        user.setActive(true);
        user.setBlocked(false);
        user.setSalutation(Salutation.MR);
        String userJson = json(user);
        // json is ignoring password and customer
        userJson = userJson.substring(0, userJson.length() - 1).concat(", \"password\" : \"john123456\", \r\n  " +
                "\"customer\" : \"/rest/repository/customers/40000\" \r\n }");

        this.mockMvc.perform(post("/rest/repository/customer-users")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(userJson))
                .andExpect(status().isCreated())
                .andDo(document("createCustomerUser",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(customerUserFieldsForRequest(false)),
                        responseFields(customerUserFieldsForResponse(false))));
    }

    @Test
    public void testDeleteCustomerUser() throws Exception {
        mockMvc.perform(delete("/rest/repository/customer-users/{id}", 1)
                .with(csrf()))
                .andDo(document("deleteCustomerUser",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("CustomerUser"))));

        mockMvc.perform(get("/rest/repository/customer-users/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateCustomerUser() throws Exception {
        mockMvc.perform(patch("/rest/repository/customer-users/{id}", 1)
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content("{ \"username\" : \"Old Johnny\" }"))
                .andExpect(status().isOk())
                .andDo(document("updateCustomerUser",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("CustomerUser")),
                        requestFields(customerUserFieldsForRequest(true)),
                        responseFields(customerUserFieldsForResponse(false))));

        mockMvc.perform(get("/rest/repository/customer-users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("Old Johnny")));
    }

    @Test
    public void testReplaceCustomerUser() throws Exception {
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
        userJson = userJson.substring(0, userJson.length() - 1).concat(", \"password\" : \"john123456\" \r\n}");

        mockMvc.perform(put("/rest/repository/customer-users/{id}", 1)
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(userJson))
                .andExpect(status().isOk())
                .andDo(document("replaceCustomerUser",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("CustomerUser")),
                        requestFields(customerUserFieldsForRequest(false)),
                        responseFields(customerUserFieldsForResponse(false))));

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
     * CustomerUser fields used in responses.
     * An array field equivalent can be provided
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] customerUserFieldsForResponse(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.customer-users[]").description("CustomerUsers list"),
                        fieldWithPath("_embedded.customer-users[].id").description("CustomerUser's id"),
                        fieldWithPath("_embedded.customer-users[].salutation").type(Salutation.class)
                                .description("CustomerUser's salutation"),
                        fieldWithPath("_embedded.customer-users[].username").description("CustomerUser's username"),
                        fieldWithPath("_embedded.customer-users[].firstname").description("CustomerUser's firstname"),
                        fieldWithPath("_embedded.customer-users[].surname").description("CustomerUser's surname"),
                        fieldWithPath("_embedded.customer-users[].email").description("CustomerUser's email"),
                        fieldWithPath("_embedded.customer-users[].active").description("CustomerUser's active"),
                        fieldWithPath("_embedded.customer-users[].blocked").description("CustomerUser's blocked"),
                        fieldWithPath("_embedded.customer-users[].lastModifiedDate").type(Date.class)
                                .description("CustomerUser's date of last modification"),
                        fieldWithPath("_embedded.customer-users[].createdDate").type(Date.class)
                                .description("CustomerUser's creation date"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("CustomerUser's id"),
                        fieldWithPath("salutation").type(Salutation.class).description("CustomerUser's salutation"),
                        fieldWithPath("username").description("CustomerUser's username"),
                        fieldWithPath("firstname").description("CustomerUser's firstname"),
                        fieldWithPath("surname").description("CustomerUser's surname"),
                        fieldWithPath("email").description("CustomerUser's email"),
                        fieldWithPath("active").description("CustomerUser's active"),
                        fieldWithPath("blocked").description("CustomerUser's blocked"),
                        fieldWithPath("lastModifiedDate").type(Date.class)
                                .description("CustomerUser's date of last modification"),
                        fieldWithPath("createdDate").type(Date.class).description("CustomerUser's creation date"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };
    }

    /**
     * CustomerUser fields used in requests.
     *
     * @return FieldDescriptor
     */
    private FieldDescriptor[] customerUserFieldsForRequest(boolean isPatchRequest) {
        return isPatchRequest ?
                new FieldDescriptor[]{
                        fieldWithPath("salutation").optional().type(Salutation.class).description("CustomerUser's salutation")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("username").optional().type(String.class).description("CustomerUser's username")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("password").optional().type(String.class).description("CustomerUser's password")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("firstname").optional().type(String.class).description("CustomerUser's firstname")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("surname").optional().type(String.class).description("CustomerUser's surname")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("email").optional().type(String.class).description("CustomerUser's email")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("active").optional().type(Boolean.class).description("CustomerUser's active")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("blocked").optional().type(Boolean.class).description("CustomerUser's blocked")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("customer").optional().type(Customer.class).description("CustomerUser's customer")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("id").optional().ignored(),
                        fieldWithPath("lastModifiedDate").optional().ignored(),
                        fieldWithPath("createdDate").optional().ignored(),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                } :
                new FieldDescriptor[]{
                        fieldWithPath("salutation").type(Salutation.class).description("CustomerUser's salutation")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("username").type(String.class).description("CustomerUser's username")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("password").type(String.class).description("CustomerUser's password")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("firstname").type(String.class).description("CustomerUser's firstname")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("surname").type(String.class).description("CustomerUser's surname")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("email").type(String.class).description("CustomerUser's email")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("active").type(Boolean.class).optional().description("CustomerUser's active")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("blocked").type(Boolean.class).optional().description("CustomerUser's blocked")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("customer").optional().type(Customer.class).description("CustomerUser's customer")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("id").optional().ignored(),
                        fieldWithPath("lastModifiedDate").optional().ignored(),
                        fieldWithPath("createdDate").optional().ignored(),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };

    }
}
