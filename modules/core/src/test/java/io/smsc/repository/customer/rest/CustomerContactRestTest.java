package io.smsc.repository.customer.rest;

import io.smsc.AbstractTest;
import io.smsc.model.customer.CustomerContact;
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
        mockMvc.perform(get("/rest/repository/customer-contacts/search/findOne?id=81"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.firstName", is(CUSTOMER_CONTACT_1.getFirstName())))
                .andExpect(jsonPath("$.surName", is(CUSTOMER_CONTACT_1.getSurName())))
                .andExpect(jsonPath("$.phone", is(CUSTOMER_CONTACT_1.getPhone())))
                .andExpect(jsonPath("$.mobilePhone", is(CUSTOMER_CONTACT_1.getMobilePhone())))
                .andExpect(jsonPath("$.fax", is(CUSTOMER_CONTACT_1.getFax())))
                .andExpect(jsonPath("$.emailAddress", is(CUSTOMER_CONTACT_1.getEmailAddress())))
                .andExpect(jsonPath("$.type", is(CUSTOMER_CONTACT_1.getType())))
                .andExpect(jsonPath("$.salutation", is(CUSTOMER_CONTACT_1.getSalutation())));
    }

    @Test
    public void testCustomerContactNotFound() throws Exception {
        mockMvc.perform(post("/rest/repository/customer-contacts/search/findOne?id=999")
                .content(this.json(new CustomerContact()))
                .contentType(contentType))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllCustomerContacts() throws Exception {
        mockMvc.perform(get("/rest/repository/customer-contacts/search/findAll"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.customer-contacts", hasSize(1)))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].firstName", is(CUSTOMER_CONTACT_1.getFirstName())))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].surName", is(CUSTOMER_CONTACT_1.getSurName())))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].phone", is(CUSTOMER_CONTACT_1.getPhone())))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].mobilePhone", is(CUSTOMER_CONTACT_1.getMobilePhone())))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].fax", is(CUSTOMER_CONTACT_1.getFax())))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].emailAddress", is(CUSTOMER_CONTACT_1.getEmailAddress())))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].type", is(CUSTOMER_CONTACT_1.getType())))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].salutation", is(CUSTOMER_CONTACT_1.getSalutation())));
    }

    @Test
    public void testCreateCustomerContact() throws Exception {
        String customerContactJson = json(new CustomerContact(null, "newName", "newSurname", "0322222222", "0632222222", "new_fake_fax", "fake@gmail.com"));
        this.mockMvc.perform(post("/rest/repository/customer-contacts")
                .contentType(contentType)
                .content(customerContactJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteCustomerContact() throws Exception {
        mockMvc.perform(delete("/rest/repository/customer-contacts/81"));
        mockMvc.perform(post("/rest/repository/customer-contacts/81"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateCustomerContact() throws Exception {
        CustomerContact updated = new CustomerContact(CUSTOMER_CONTACT_1);
        updated.setType(Type.PRIMARY);
        updated.setEmailAddress("new_email@gmial.com");
        updated.setMobilePhone("0971234567");
        updated.setFirstName("newFirstName");
        String customerContactJson = json(updated);
        mockMvc.perform(put("/rest/repository/customer-contacts/81")
                .contentType(contentType)
                .content(customerContactJson))
                .andExpect(status().isNoContent());
        mockMvc.perform(get("/rest/repository/customer-contacts/search/findOne?id=81"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.firstName", is(updated.getFirstName())))
                .andExpect(jsonPath("$.surName", is(updated.getSurName())))
                .andExpect(jsonPath("$.phone", is(updated.getPhone())))
                .andExpect(jsonPath("$.mobilePhone", is(updated.getMobilePhone())))
                .andExpect(jsonPath("$.fax", is(updated.getFax())))
                .andExpect(jsonPath("$.emailAddress", is(updated.getEmailAddress())))
                .andExpect(jsonPath("$.type", is(updated.getType())))
                .andExpect(jsonPath("$.salutation", is(updated.getSalutation())));
    }
}
