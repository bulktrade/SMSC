package io.smsc.repository.customer.rest;

import io.smsc.AbstractTest;
import io.smsc.model.customer.Contact;
import io.smsc.model.customer.Salutation;
import io.smsc.model.customer.Type;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username = "Admin", roles = {"ADMIN"})
public class ContactTest extends AbstractTest {

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
        Contact contact = new Contact();
        contact.setId(null);
        contact.setFirstname("SMSC");
        contact.setSurname("SMSC");
        contact.setPhone("0322222222");
        contact.setMobilePhone("0632222222");
        contact.setFax("new_fake_fax");
        contact.setEmailAddress("new_fake1@gmail.com");
        contact.setType(Type.PRIMARY);
        contact.setSalutation(Salutation.MRS);
        String customerContactJson = json(contact);
        // json is ignoring inserting customer through setter
        customerContactJson = customerContactJson.substring(0, customerContactJson.length() - 1).concat(", \"customer\" : \"/rest/repository/customers/40000\" \r\n }");
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
        Contact contact = new Contact();
        contact.setId(1L);
        contact.setFirstname("SMSC");
        contact.setSurname("SMSC");
        contact.setPhone("0322222222");
        contact.setMobilePhone("0632222222");
        contact.setFax("new_fake_fax");
        contact.setEmailAddress("fake@gmail.com");
        contact.setType(Type.PRIMARY);
        contact.setSalutation(Salutation.MRS);
        String customerContactJson = json(contact);
        mockMvc.perform(put("/rest/repository/customer-contacts/1")
                .contentType("application/json;charset=UTF-8")
                .content(customerContactJson))
                .andExpect(status().isOk());
        mockMvc.perform(get("/rest/repository/customer-contacts/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.firstname", is("SMSC")))
                .andExpect(jsonPath("$.surname", is("SMSC")))
                .andExpect(jsonPath("$.phone", is("0322222222")))
                .andExpect(jsonPath("$.mobilePhone", is("0632222222")))
                .andExpect(jsonPath("$.fax", is("new_fake_fax")))
                .andExpect(jsonPath("$.emailAddress", is("fake@gmail.com")))
                .andExpect(jsonPath("$.type", is(Type.PRIMARY.toString())))
                .andExpect(jsonPath("$.salutation", is(Salutation.MRS.toString())));
    }
}
