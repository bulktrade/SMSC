package io.smsc.repository.customer;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.model.customer.Contact;
import io.smsc.model.customer.Salutation;
import io.smsc.model.customer.Type;
import org.junit.Test;
import org.springframework.restdocs.mockmvc.RestDocumentationResultHandler;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.security.test.context.support.WithMockUser;

import static org.hamcrest.Matchers.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username = "Admin", roles = {"POWER_ADMIN_USER"})
public class ContactRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleCustomerContact() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getContact");

        document
                .document(pathParameters(getPathParam("Contact")),
                        responseFields(contactFields(false)));

        mockMvc.perform(get("/rest/repository/customer-contacts/2"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.firstname", is("SMSC")))
                .andExpect(jsonPath("$.surname", is("SMSC")))
                .andExpect(jsonPath("$.phone", is("0674329568")))
                .andExpect(jsonPath("$.mobilePhone", is("0504569753")))
                .andExpect(jsonPath("$.fax", is("fake_fax")))
                .andExpect(jsonPath("$.emailAddress", is("smsc@bulk.io")))
                .andExpect(jsonPath("$.type", is(Type.CEO.toString())))
                .andExpect(jsonPath("$.salutation", is(Salutation.MR.toString())))
                .andDo(document);
    }

    @Test
    public void testCustomerContactNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/customer-contacts/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllCustomerContacts() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getContacts");

        document
                .document(pathParameters(
                        parameterWithName("page").description("Page of results"),
                        parameterWithName("size").description("Size of results")),
                        responseFields(contactFields(true)));

        mockMvc.perform(get("/rest/repository/customer-contacts"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.customer-contacts", hasSize(2)))
                .andExpect(jsonPath("$._embedded.customer-contacts[1].firstname", is("SMSC")))
                .andExpect(jsonPath("$._embedded.customer-contacts[1].surname", is("SMSC")))
                .andExpect(jsonPath("$._embedded.customer-contacts[1].phone", is("0674329568")))
                .andExpect(jsonPath("$._embedded.customer-contacts[1].mobilePhone", is("0504569753")))
                .andExpect(jsonPath("$._embedded.customer-contacts[1].fax", is("fake_fax")))
                .andExpect(jsonPath("$._embedded.customer-contacts[1].emailAddress", is("smsc@bulk.io")))
                .andExpect(jsonPath("$._embedded.customer-contacts[1].type", is(Type.CEO.toString())))
                .andExpect(jsonPath("$._embedded.customer-contacts[1].salutation", is(Salutation.MR.toString())))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].firstname", is("Default first name")))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].surname", is("Default surname")))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].phone", is("0671234567")))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].mobilePhone", is("0501234567")))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].fax", is("default fax")))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].emailAddress", is("default@gmail.com")))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].type", is(Type.CEO.toString())))
                .andExpect(jsonPath("$._embedded.customer-contacts[0].salutation", is(Salutation.MRS.toString())))
                .andDo(document);
    }

    @Test
    public void testCreateCustomerContact() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("createContact");

        document
                .document(requestFields(contactFields(false)),
                        responseFields(contactFields(false)));

        Contact contact = new Contact();
        contact.setId(null);
        contact.setFirstname("SMSC");
        contact.setSurname("SMSC");
        contact.setPhone("0322222222");
        contact.setMobilePhone("0632222222");
        contact.setFax("new_fake_fax");
        contact.setEmailAddress("new_fake@gmail.com");
        contact.setType(Type.PRIMARY);
        contact.setSalutation(Salutation.MRS);
        String customerContactJson = json(contact);
        // json is ignoring inserting customer through setter
        customerContactJson = customerContactJson.substring(0, customerContactJson.length() - 1).concat(", \"customer\" : \"/rest/repository/customers/40000\" \r\n }");

        mockMvc.perform(post("/rest/repository/customer-contacts")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(customerContactJson))
                .andExpect(status().isCreated())
                .andDo(document);
    }

    @Test
    public void testDeleteCustomerContact() throws Exception {
        RestDocumentationResultHandler document = documentPrettyPrintReqResp("deleteContact");

        document
                .document(pathParameters(getPathParam("Contact")),
                        responseFields(contactFields(false)));

        mockMvc.perform(delete("/rest/repository/customer-contacts/1")
                .with(csrf()))
                .andDo(document);

        mockMvc.perform(get("/rest/repository/customer-contacts/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testReplaceCustomerContact() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("replaceContact");

        document
                .document(pathParameters(getPathParam("Contact")),
                        requestFields(contactFields(false)),
                        responseFields(contactFields(false)));

        Contact contact = new Contact();
        contact.setId(2L);
        contact.setFirstname("SMSC");
        contact.setSurname("SMSC");
        contact.setPhone("0322222222");
        contact.setMobilePhone("0632222222");
        contact.setFax("new_fake_fax");
        contact.setEmailAddress("fake@gmail.com");
        contact.setType(Type.PRIMARY);
        contact.setSalutation(Salutation.MRS);
        String customerContactJson = json(contact);

        mockMvc.perform(put("/rest/repository/customer-contacts/2")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(customerContactJson))
                .andExpect(status().isOk())
                .andDo(document);

        mockMvc.perform(get("/rest/repository/customer-contacts/2"))
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

    /**
     * Contact fields used in requests and responses.
     * An array field equivalent can be provided
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] contactFields(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.customer-contacts[]").description("Contact list"),
                        fieldWithPath("_embedded.customer-contacts[].id").description("Contact's id"),
                        fieldWithPath("_embedded.customer-contacts[].firstname").description("Contact's firstname"),
                        fieldWithPath("_embedded.customer-contacts[].surname").description("Contact's surname"),
                        fieldWithPath("_embedded.customer-contacts[].phone").description("Contact's phone"),
                        fieldWithPath("_embedded.customer-contacts[].mobilePhone").description("Contact's mobilePhone"),
                        fieldWithPath("_embedded.customer-contacts[].fax").description("Contact's fax"),
                        fieldWithPath("_embedded.customer-contacts[].emailAddress").description("Contact's emailAddress"),
                        fieldWithPath("_embedded.customer-contacts[].type").description("Contact's type"),
                        fieldWithPath("_embedded.customer-contacts[].salutation").description("Contact's salutation")
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("Contact's id"),
                        fieldWithPath("firstname").description("Contact's firstname"),
                        fieldWithPath("surname").description("Contact's surname"),
                        fieldWithPath("phone").description("Contact's phone"),
                        fieldWithPath("mobilePhone").description("Contact's mobilePhone"),
                        fieldWithPath(".fax").description("Contact's fax"),
                        fieldWithPath("emailAddress").description("Contact's emailAddress"),
                        fieldWithPath("type").description("Contact's type"),
                        fieldWithPath("salutation").description("Contact's salutation")
                };
    }
}
