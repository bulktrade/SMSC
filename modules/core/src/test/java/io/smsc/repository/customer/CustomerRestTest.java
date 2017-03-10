package io.smsc.repository.customer;

import io.smsc.AbstractTest;
import io.smsc.model.customer.Customer;
import org.apache.catalina.connector.Response;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.ResultMatcher;

import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username = "Admin", roles = {"POWER_ADMIN_USER"})
public class CustomerRestTest extends AbstractTest {

    @Test
    public void testGetSingleCustomer() throws Exception {
        mockMvc.perform(get("/rest/repository/customers/40001"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.companyName", is("SMSC")))
                .andExpect(jsonPath("$.street", is("Amtsgericht")))
                .andExpect(jsonPath("$.street2", is("Amtsgericht")))
                .andExpect(jsonPath("$.postcode", is("3254")))
                .andExpect(jsonPath("$.country", is("Germany")))
                .andExpect(jsonPath("$.city", is("Stuttgart")))
                .andExpect(jsonPath("$.vatid", is("5672394.0")));
    }

    @Test
    public void testCustomerNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/customers/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllCustomers() throws Exception {
        mockMvc.perform(get("/rest/repository/customers"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.customers", hasSize(2)))
                .andExpect(jsonPath("$._embedded.customers[1].companyName", is("SMSC")))
                .andExpect(jsonPath("$._embedded.customers[1].street", is("Amtsgericht")))
                .andExpect(jsonPath("$._embedded.customers[1].street2", is("Amtsgericht")))
                .andExpect(jsonPath("$._embedded.customers[1].postcode", is("3254")))
                .andExpect(jsonPath("$._embedded.customers[1].country", is("Germany")))
                .andExpect(jsonPath("$._embedded.customers[1].city", is("Stuttgart")))
                .andExpect(jsonPath("$._embedded.customers[1].vatid", is("5672394.0")))
                .andExpect(jsonPath("$._embedded.customers[0].companyName", is("Default company")))
                .andExpect(jsonPath("$._embedded.customers[0].street", is("First default street")))
                .andExpect(jsonPath("$._embedded.customers[0].street2", is("Second default street")))
                .andExpect(jsonPath("$._embedded.customers[0].postcode", is("9119")))
                .andExpect(jsonPath("$._embedded.customers[0].country", is("Ukraine")))
                .andExpect(jsonPath("$._embedded.customers[0].city", is("Lviv")))
                .andExpect(jsonPath("$._embedded.customers[0].vatid", is("1234567.0")));
    }

    @Test
    public void testCreateCustomer() throws Exception {
        Customer customer = new Customer();
        customer.setCompanyName("newCompany");
        customer.setStreet("newStreet");
        customer.setStreet2("newStreet2");
        customer.setPostcode("79005");
        customer.setCountry("Ukraine");
        customer.setCity("Lviv");
        customer.setVatid("9999999.0");
        String customerJson = json(customer);
        this.mockMvc.perform(post("/rest/repository/customers")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(customerJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteCustomer() throws Exception {
        mockMvc.perform(delete("/rest/repository/customers/40000")
                .with(csrf()));
        mockMvc.perform(get("/rest/repository/customers/40000"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateCustomer() throws Exception {
        Customer customer = new Customer();
        customer.setId(40001L);
        customer.setCompanyName("newCompany");
        customer.setStreet("newStreet");
        customer.setStreet2("newStreet2");
        customer.setPostcode("79005");
        customer.setCountry("Ukraine");
        customer.setCity("Lviv");
        customer.setVatid("9999999.0");
        String customerJson = json(customer);
        mockMvc.perform(put("/rest/repository/customers/40001")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(customerJson))
                .andExpect(status().isOk());
        mockMvc.perform(get("/rest/repository/customers/40001"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.companyName", is("newCompany")))
                .andExpect(jsonPath("$.street", is("newStreet")))
                .andExpect(jsonPath("$.street2", is("newStreet2")))
                .andExpect(jsonPath("$.postcode", is("79005")))
                .andExpect(jsonPath("$.country", is("Ukraine")))
                .andExpect(jsonPath("$.city", is("Lviv")))
                .andExpect(jsonPath("$.vatid", is("9999999.0")));
    }

    @Test
    public void testSetAndDeleteParent() throws Exception {
        mockMvc.perform(patch("/rest/repository/customers/40000")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content("{\"parent\" : \"/rest/repository/customers/40001\"}"))
                .andExpect(status().isOk());
        mockMvc.perform(get("/rest/repository/customers/40000/parent"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.id", is(40001)));

        mockMvc.perform(patch("/rest/repository/customers/40000")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content("{\"parent\" : null}"))
                .andExpect(status().isOk());
        mockMvc.perform(get("/rest/repository/customers/40000/parent"))
                .andExpect(status().isNotFound());

    }
}
