package io.smsc.repository.customer.rest;

import io.smsc.AbstractTest;
import io.smsc.model.customer.CustomerContact;
import io.smsc.model.customer.Salutation;
import io.smsc.model.customer.Type;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static io.smsc.test_data.CustomerContactTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class CustomerContactRestTest extends AbstractTest {

    @Test
    public void testGetSingleCustomerContact() throws Exception {
        mockMvc.perform(get("/rest/repository/customer-contacts/139"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.firstname", is(CUSTOMER_CONTACT_1.getFirstname())))
                .andExpect(jsonPath("$.surname", is(CUSTOMER_CONTACT_1.getSurname())))
                .andExpect(jsonPath("$.phone", is(CUSTOMER_CONTACT_1.getPhone())))
                .andExpect(jsonPath("$.mobilePhone", is(CUSTOMER_CONTACT_1.getMobilePhone())))
                .andExpect(jsonPath("$.fax", is(CUSTOMER_CONTACT_1.getFax())))
                .andExpect(jsonPath("$.emailAddress", is(CUSTOMER_CONTACT_1.getEmailAddress())))
                .andExpect(jsonPath("$.type", is(Type.CEO.toString())))
                .andExpect(jsonPath("$.salutation", is(Salutation.TECHNICAL.toString())));
    }

    @Test
    public void testCustomerContactNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/customer-contacts/search/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllCustomerContacts() throws Exception {
        mockMvc.perform(get("/rest/repository/customer-contacts/search/findAll"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.customer-contacts", hasSize(1)))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].firstname", is(CUSTOMER_CONTACT_1.getFirstname())))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].surname", is(CUSTOMER_CONTACT_1.getSurname())))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].phone", is(CUSTOMER_CONTACT_1.getPhone())))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].mobilePhone", is(CUSTOMER_CONTACT_1.getMobilePhone())))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].fax", is(CUSTOMER_CONTACT_1.getFax())))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].emailAddress", is(CUSTOMER_CONTACT_1.getEmailAddress())))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].type", is(Type.CEO.toString())))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].salutation", is(Salutation.TECHNICAL.toString())));
    }

    @Test
    public void testCreateCustomerContact() throws Exception {
        String customerContactJson = json(new CustomerContact(null, "newName", "newSurname", "0322222222", "0632222222", "new_fake_fax", "fake@gmail.com", Type.TECHNICAL, Salutation.CEO));
        this.mockMvc.perform(post("/rest/repository/customer-contacts")
                .contentType(contentType)
                .content(customerContactJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteCustomerContact() throws Exception {
        mockMvc.perform(delete("/rest/repository/customer-contacts/139"));
        mockMvc.perform(get("/rest/repository/customer-contacts/139"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateCustomerContact() throws Exception {
        CustomerContact updated = new CustomerContact(CUSTOMER_CONTACT_1);
        updated.setType(Type.PRIMARY);
        updated.setSalutation(Salutation.CEO);
        updated.setEmailAddress("new_email@gmial.com");
        updated.setMobilePhone("0971234567");
        updated.setFirstname("newFirstName");
        String customerContactJson = json(updated);
        mockMvc.perform(put("/rest/repository/customer-contacts/139")
                .contentType(contentType)
                .content(customerContactJson))
                .andExpect(status().isNoContent());
        mockMvc.perform(get("/rest/repository/customer-contacts/139"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.firstname", is(updated.getFirstname())))
                .andExpect(jsonPath("$.surname", is(updated.getSurname())))
                .andExpect(jsonPath("$.phone", is(updated.getPhone())))
                .andExpect(jsonPath("$.mobilePhone", is(updated.getMobilePhone())))
                .andExpect(jsonPath("$.fax", is(updated.getFax())))
                .andExpect(jsonPath("$.emailAddress", is(updated.getEmailAddress())))
                .andExpect(jsonPath("$.type", is(Type.PRIMARY.toString())))
                .andExpect(jsonPath("$.salutation", is(Salutation.CEO.toString())));
    }
}
