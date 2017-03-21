package io.smsc.repository.customer;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.model.customer.Customer;
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
public class CustomerRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleCustomer() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getCustomer");

        document
                .document(pathParameters(getPathParam("Customer")),
                        responseFields(customerFields(false)));

        mockMvc.perform(get("/rest/repository/customers/40001"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.companyName", is("SMSC")))
                .andExpect(jsonPath("$.street", is("Amtsgericht")))
                .andExpect(jsonPath("$.street2", is("Amtsgericht")))
                .andExpect(jsonPath("$.postcode", is("3254")))
                .andExpect(jsonPath("$.country", is("Germany")))
                .andExpect(jsonPath("$.city", is("Stuttgart")))
                .andExpect(jsonPath("$.vatid", is("5672394.0")))
                .andDo(document);
    }

    @Test
    public void testCustomerNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/customers/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllCustomers() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("getCustomers");

        document
                .document(pathParameters(
                        parameterWithName("page").description("Page of results"),
                        parameterWithName("size").description("Size of results")),
                        responseFields(customerFields(true)));

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
                .andExpect(jsonPath("$._embedded.customers[0].vatid", is("1234567.0")))
                .andDo(document);
    }

    @Test
    public void testCreateCustomer() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("createCustomer");

        document
                .document(requestFields(customerFields(false)),
                        responseFields(customerFields(false)));

        Customer customer = new Customer();
        customer.setCompanyName("newCompany");
        customer.setStreet("newStreet");
        customer.setStreet2("newStreet2");
        customer.setPostcode("79005");
        customer.setCountry("Ukraine");
        customer.setCity("Lviv");
        customer.setVatid("9999999.0");
        String customerJson = json(customer);

        mockMvc.perform(post("/rest/repository/customers")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(customerJson))
                .andExpect(status().isCreated())
                .andDo(document);
    }

    @Test
    public void testDeleteCustomer() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("deleteCustomer");

        document
                .document(pathParameters(getPathParam("Customer")),
                        responseFields(customerFields(false)));

        mockMvc.perform(delete("/rest/repository/customers/40000")
                .with(csrf()))
                .andDo(document);

        mockMvc.perform(get("/rest/repository/customers/40000"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testReplaceCustomer() throws Exception {

        RestDocumentationResultHandler document = documentPrettyPrintReqResp("replaceCustomer");

        document
                .document(pathParameters(getPathParam("Customer")),
                        requestFields(customerFields(false)),
                        responseFields(customerFields(false)));

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
                .andExpect(status().isOk())
                .andDo(document);

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

    /**
     * Customer fields used in requests and responses.
     * An array field equivalent can be provided
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] customerFields(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.customers[]").description("Customer list"),
                        fieldWithPath("_embedded.customers[].id").description("Customer's id"),
                        fieldWithPath("_embedded.customers[].companyName").description("Customer's companyName"),
                        fieldWithPath("_embedded.customers[].street").description("Customer's street"),
                        fieldWithPath("_embedded.customers[].street2").description("Customer's street2"),
                        fieldWithPath("_embedded.customers[].postcode").description("Customer's postcode"),
                        fieldWithPath("_embedded.customers[].country").description("Customer's country"),
                        fieldWithPath("_embedded.customers[].city").description("Customer's city"),
                        fieldWithPath("_embedded.customers[].vatid").description("Customer's vatid")
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("Customer's id"),
                        fieldWithPath("companyName").description("Customer's companyName"),
                        fieldWithPath("street").description("Customer's street"),
                        fieldWithPath("street2").description("Customer's street2"),
                        fieldWithPath("postcode").description("Customer's postcode"),
                        fieldWithPath("country").description("Customer's country"),
                        fieldWithPath("city").description("Customer's city"),
                        fieldWithPath("vatid").description("Customer's vatid")
                };
    }
}
