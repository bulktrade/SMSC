package io.smsc.repository.customer.rest;

import io.smsc.AbstractTest;
import io.smsc.model.customer.Customer;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class CustomerRestTest extends AbstractTest {

    @Test
    public void testGetSingleCustomer() throws Exception {
        mockMvc.perform(get("/rest/repository/customers/40000"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.companyName", is("SMSC")))
                .andExpect(jsonPath("$.street", is("Amtsgericht")))
                .andExpect(jsonPath("$.street2", is("Amtsgericht")))
                .andExpect(jsonPath("$.postcode", is("3254")))
                .andExpect(jsonPath("$.country", is("Germany")))
                .andExpect(jsonPath("$.city", is("Stuttgart")))
                .andExpect(jsonPath("$.vatid", is(5672394.0)));
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
                .andExpect(jsonPath("$._embedded.customers", hasSize(1)))
                .andExpect(jsonPath("$._embedded.customers[0].companyName", is("SMSC")))
                .andExpect(jsonPath("$._embedded.customers[0].street", is("Amtsgericht")))
                .andExpect(jsonPath("$._embedded.customers[0].street2", is("Amtsgericht")))
                .andExpect(jsonPath("$._embedded.customers[0].postcode", is("3254")))
                .andExpect(jsonPath("$._embedded.customers[0].country", is("Germany")))
                .andExpect(jsonPath("$._embedded.customers[0].city", is("Stuttgart")))
                .andExpect(jsonPath("$._embedded.customers[0].vatid", is(5672394.0)));
    }

    @Test
    public void testCreateCustomer() throws Exception {
        Customer customer = new Customer();
        customer.setId(2L);
        customer.setCompanyName("newCompany");
        customer.setStreet("newStreet");
        customer.setStreet2("newStreet2");
        customer.setPostcode("79005");
        customer.setCountry("Ukraine");
        customer.setCity("Lviv");
        customer.setVatid(9999999.0);
        String customerJson = json(customer);
        this.mockMvc.perform(post("/rest/repository/customers")
                .contentType("application/json;charset=UTF-8")
                .content(customerJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteCustomer() throws Exception {
        mockMvc.perform(delete("/rest/repository/customers/delete/1"));
        mockMvc.perform(get("/rest/repository/customers/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateCustomer() throws Exception {
        Customer customer = new Customer();
        customer.setId(40000L);
        customer.setCompanyName("newCompany");
        customer.setStreet("newStreet");
        customer.setStreet2("newStreet2");
        customer.setPostcode("79005");
        customer.setCountry("Ukraine");
        customer.setCity("Lviv");
        customer.setVatid(9999999.0);
        String customerJson = json(customer);
        mockMvc.perform(put("/rest/repository/customers/40000")
                .contentType("application/json;charset=UTF-8")
                .content(customerJson))
                .andExpect(status().isOk());
        mockMvc.perform(get("/rest/repository/customers/40000"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.companyName", is("newCompany")))
                .andExpect(jsonPath("$.street", is("newStreet")))
                .andExpect(jsonPath("$.street2", is("newStreet2")))
                .andExpect(jsonPath("$.postcode", is("79005")))
                .andExpect(jsonPath("$.country", is("Ukraine")))
                .andExpect(jsonPath("$.city", is("Lviv")))
                .andExpect(jsonPath("$.vatid", is(9999999.0)));
    }
}
