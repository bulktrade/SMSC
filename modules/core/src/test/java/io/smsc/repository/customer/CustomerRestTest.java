package io.smsc.repository.customer;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.model.customer.Customer;
import org.junit.Test;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Date;

import static org.hamcrest.Matchers.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username = "Admin", roles = {"POWER_ADMIN_USER"})
public class CustomerRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleCustomer() throws Exception {
        mockMvc.perform(get("/rest/repository/customers/{id}", 40001))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.companyName", is("SMSC")))
                .andExpect(jsonPath("$.street", is("Amtsgericht")))
                .andExpect(jsonPath("$.street2", is("Amtsgericht")))
                .andExpect(jsonPath("$.postcode", is("3254")))
                .andExpect(jsonPath("$.country", is("Germany")))
                .andExpect(jsonPath("$.city", is("Stuttgart")))
                .andExpect(jsonPath("$.vatid", is("5672394.0")))
                .andDo(document("getCustomer",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Customer")),
                        responseFields(customerFieldsForResponse(false))));
    }

    @Test
    public void testCustomerNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/customers/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllCustomers() throws Exception {
        mockMvc.perform(get("/rest/repository/customers?page=0&size=20"))
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
                .andDo(document("getCustomers",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("page").description("Page of results"),
                                parameterWithName("size").description("Size of results")),
                        responseFields(customerFieldsForResponse(true))));
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

        mockMvc.perform(post("/rest/repository/customers")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(customerJson))
                .andExpect(status().isCreated())
                .andDo(document("createCustomer",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(customerFieldsForRequest()),
                        responseFields(customerFieldsForResponse(false))));
    }

    @Test
    public void testDeleteCustomer() throws Exception {
        mockMvc.perform(delete("/rest/repository/customers/{id}", 40000)
                .with(csrf()))
                .andDo(document("deleteCustomer",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Customer"))));

        mockMvc.perform(get("/rest/repository/customers/40000"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateCustomer() throws Exception {
        mockMvc.perform(patch("/rest/repository/customers/{id}", 40001)
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content("{ \"street\" : \"newStreet\" }"))
                .andExpect(status().isOk())
                .andDo(document("updateCustomer",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Customer")),
                        requestFields(customerFieldsForRequest()),
                        responseFields(customerFieldsForResponse(false))));

        mockMvc.perform(get("/rest/repository/customers/40001"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.street", is("newStreet")));
    }

    @Test
    public void testReplaceCustomer() throws Exception {
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

        mockMvc.perform(put("/rest/repository/customers/{id}", 40001)
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(customerJson))
                .andExpect(status().isOk())
                .andDo(document("replaceCustomer",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Customer")),
                        requestFields(customerFieldsForRequest()),
                        responseFields(customerFieldsForResponse(false))));

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
     * Customer fields used in responses.
     * An array field equivalent can be provided
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] customerFieldsForResponse(boolean isJsonArray) {
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
                        fieldWithPath("_embedded.customers[].vatid").description("Customer's vatid"),
                        fieldWithPath("_embedded.customers[].lastModifiedDate").type(Date.class)
                                .description("Customer's date of last modification"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("Customer's id"),
                        fieldWithPath("companyName").description("Customer's companyName"),
                        fieldWithPath("street").description("Customer's street"),
                        fieldWithPath("street2").description("Customer's street2"),
                        fieldWithPath("postcode").description("Customer's postcode"),
                        fieldWithPath("country").description("Customer's country"),
                        fieldWithPath("city").description("Customer's city"),
                        fieldWithPath("vatid").description("Customer's vatid"),
                        fieldWithPath("lastModifiedDate").type(Date.class).description("Customer's date of last modification"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };
    }

    /**
     * Customer fields used in requests.
     *
     * @return FieldDescriptor
     */
    private FieldDescriptor[] customerFieldsForRequest() {
        return new FieldDescriptor[]{
                fieldWithPath("companyName").optional().type(String.class).description("Customer's companyName"),
                fieldWithPath("street").optional().type(String.class).description("Customer's street"),
                fieldWithPath("street2").optional().type(String.class).description("Customer's street2"),
                fieldWithPath("postcode").optional().type(String.class).description("Customer's postcode"),
                fieldWithPath("country").optional().type(String.class).description("Customer's country"),
                fieldWithPath("city").optional().type(String.class).description("Customer's city"),
                fieldWithPath("vatid").optional().type(String.class).description("Customer's vatid"),
                fieldWithPath("parent").optional().type(Customer.class).description("Customer's parent"),
                fieldWithPath("id").optional().ignored(),
                fieldWithPath("lastModifiedDate").optional().ignored(),
                fieldWithPath("_links").optional().ignored(),
                fieldWithPath("page").optional().ignored()
        };
    }
}
