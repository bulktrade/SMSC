package io.smsc.repository.customer;

import io.smsc.AbstractTest;
import io.smsc.model.customer.Salutation;
import io.smsc.model.customer.User;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WithMockUser(username = "Admin", authorities = {"USER_2"})
public class CustomerUserRestTest extends AbstractTest {

    @Test
    public void testGetSingleCustomerUser() throws Exception {
        mockMvc.perform(get("/rest/repository/customer-users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("user")))
                .andExpect(jsonPath("$.firstname", is("userName")))
                .andExpect(jsonPath("$.surname", is("userSurname")))
                .andExpect(jsonPath("$.email", is("user@gmail.com")))
                .andExpect(jsonPath("$.active", is(true)))
                .andExpect(jsonPath("$.blocked", is(false)));
    }

    @Test
    public void testCustomerUserNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/customer-users/999")
                .contentType("application/json;charset=UTF-8"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllCustomerUsers() throws Exception {
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
                .andExpect(jsonPath("$._embedded.customer-users[1].blocked", is(false)));
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
        String customerUserJson = json(user);
        // json is ignoring inserting password and customer through setter
        customerUserJson = customerUserJson.substring(0, customerUserJson.length() - 1).concat(", \"password\" : \"john123456\", \"customer\" : \"rest/repository/customers/40000\" \r\n }");
        this.mockMvc.perform(post("/rest/repository/users")
                .contentType("application/json;charset=UTF-8")
                .content(customerUserJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteCustomerUser() throws Exception {
        mockMvc.perform(delete("/rest/repository/customer-users/1"));
        mockMvc.perform(get("/rest/repository/customer-users/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateCustomerUser() throws Exception {
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
                .contentType("application/json;charset=UTF-8")
                .content(customerUserJson))
                .andExpect(status().isOk());
        mockMvc.perform(get("/rest/repository/customer-users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("Old Johnny")))
                .andExpect(jsonPath("$.firstname", is("John")))
                .andExpect(jsonPath("$.surname", is("Forrester")))
                .andExpect(jsonPath("$.email", is("john@gmail.com")))
                .andExpect(jsonPath("$.active", is(false)))
                .andExpect(jsonPath("$.blocked", is(true)));
    }
}
