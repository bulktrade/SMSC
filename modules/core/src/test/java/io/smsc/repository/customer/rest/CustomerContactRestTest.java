package io.smsc.repository.customer.rest;

import io.smsc.AbstractTest;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.CustomerContact;
import io.smsc.model.customer.Salutation;
import io.smsc.model.customer.Type;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username = "Admin", roles = {"ADMIN"})
public class CustomerContactRestTest extends AbstractTest {

    @Test
    public void testGetSingleCustomerContact() throws Exception {
        mockMvc.perform(get("/rest/repository/customer-contacts/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.firstname", is("SMSC")))
                .andExpect(jsonPath("$.surname", is("SMSC")))
                .andExpect(jsonPath("$.phone", is("0674329568")))
                .andExpect(jsonPath("$.mobilePhone", is("0504569753")))
                .andExpect(jsonPath("$.fax", is("fake_fax")))
                .andExpect(jsonPath("$.emailAddress", is("smsc@bulk.io")))
                .andExpect(jsonPath("$.type", is(Type.CEO.toString())))
                .andExpect(jsonPath("$.salutation", is(Salutation.MR.toString())));
    }

    @Test
    public void testCustomerContactNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/customer-contacts/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllCustomerContacts() throws Exception {
        mockMvc.perform(get("/rest/repository/customer-contacts"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.customer-contacts", hasSize(1)))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].firstname", is("SMSC")))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].surname", is("SMSC")))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].phone", is("0674329568")))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].mobilePhone", is("0504569753")))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].fax", is("fake_fax")))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].emailAddress", is("smsc@bulk.io")))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].type", is(Type.CEO.toString())))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].salutation", is(Salutation.MR.toString())));
    }

    @Test
    public void testCreateCustomerContact() throws Exception {
        Customer customer = new Customer(1L, "SMSC", "Amtsgericht", "Amtsgericht", "3254", "Germany", "Stuttgart", 5672394.0);
        String customerContactJson = json(new CustomerContact(null, "newName", "newSurname", "0322222222", "0632222222", "new_fake_fax", "fake@gmail.com", Type.TECHNICAL, Salutation.MRS, customer));
        this.mockMvc.perform(post("/rest/repository/customer-contacts")
                .contentType("application/json;charset=UTF-8")
                .content(customerContactJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteCustomerContact() throws Exception {
        mockMvc.perform(delete("/rest/repository/customer-contacts/1"));
        mockMvc.perform(get("/rest/repository/customer-contacts/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateCustomerContact() throws Exception {
        Customer customer = new Customer(1L, "SMSC", "Amtsgericht", "Amtsgericht", "3254", "Germany", "Stuttgart", 5672394.0);
        CustomerContact updated = new CustomerContact(1L, "SMSC", "SMSC", "0674329568", "0504569753", "fake_fax", "smsc@bulk.io", Type.CEO, Salutation.MR, customer);
        updated.setType(Type.PRIMARY);
        updated.setSalutation(Salutation.MRS);
        updated.setEmailAddress("new_email@gmial.com");
        updated.setMobilePhone("0971234567");
        updated.setFirstname("newFirstName");
        String customerContactJson = json(updated);
        mockMvc.perform(put("/rest/repository/customer-contacts/1")
                .contentType("application/json;charset=UTF-8")
                .content(customerContactJson))
                .andExpect(status().isOk());
        mockMvc.perform(get("/rest/repository/customer-contacts/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.firstname", is(updated.getFirstname())))
                .andExpect(jsonPath("$.surname", is(updated.getSurname())))
                .andExpect(jsonPath("$.phone", is(updated.getPhone())))
                .andExpect(jsonPath("$.mobilePhone", is(updated.getMobilePhone())))
                .andExpect(jsonPath("$.fax", is(updated.getFax())))
                .andExpect(jsonPath("$.emailAddress", is(updated.getEmailAddress())))
                .andExpect(jsonPath("$.type", is(Type.PRIMARY.toString())))
                .andExpect(jsonPath("$.salutation", is(Salutation.MRS.toString())));
    }
}
