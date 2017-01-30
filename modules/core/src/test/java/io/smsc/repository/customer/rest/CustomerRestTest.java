//package io.smsc.repository.customer.rest;
//
//import io.smsc.AbstractTest;
//import io.smsc.model.customer.Customer;
//import org.junit.Test;
//import org.springframework.http.MediaType;
//import org.springframework.security.test.context.support.WithMockUser;
//
//import static org.hamcrest.Matchers.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//import static io.smsc.test_data.CustomerTestData.*;
//
//@WithMockUser(username="Admin",roles = {"ADMIN"})
//public class CustomerRestTest extends AbstractTest {
//
////    @Test
////    public void testGetSingleCustomer() throws Exception {
////        mockMvc.perform(get("/rest/repository/customers/240"))
////                .andExpect(status().isOk())
////                .andExpect(content().contentType(contentType))
////                .andExpect(jsonPath("$.customerId", is(CUSTOMER_1.getCustomerId())))
////                .andExpect(jsonPath("$.companyName", is(CUSTOMER_1.getCompanyName())))
////                .andExpect(jsonPath("$.street", is(CUSTOMER_1.getStreet())))
////                .andExpect(jsonPath("$.street2", is(CUSTOMER_1.getStreet2())))
////                .andExpect(jsonPath("$.postcode", is(CUSTOMER_1.getPostcode())))
////                .andExpect(jsonPath("$.country", is(CUSTOMER_1.getCountry())))
////                .andExpect(jsonPath("$.city", is(CUSTOMER_1.getCity())))
////                .andExpect(jsonPath("$.vatid", is(CUSTOMER_1.getVatid())));
////    }
////
////    @Test
////    public void testCustomerNotFound() throws Exception {
////        mockMvc.perform(get("/rest/repository/customers/999"))
////                .andExpect(status().isNotFound());
////    }
////
////    @Test
////    public void testGetAllCustomers() throws Exception {
////        mockMvc.perform(get("/rest/repository/customers"))
////                .andExpect(status().isOk())
////                .andExpect(content().contentType(contentType))
////                .andExpect(jsonPath("$._embedded.customers", hasSize(1)))
////                .andExpect(jsonPath("$._embedded.customers[0].customerId", is(CUSTOMER_1.getCustomerId())))
////                .andExpect(jsonPath("$._embedded.customers[0].companyName", is(CUSTOMER_1.getCompanyName())))
////                .andExpect(jsonPath("$._embedded.customers[0].street", is(CUSTOMER_1.getStreet())))
////                .andExpect(jsonPath("$._embedded.customers[0].street2", is(CUSTOMER_1.getStreet2())))
////                .andExpect(jsonPath("$._embedded.customers[0].postcode", is(CUSTOMER_1.getPostcode())))
////                .andExpect(jsonPath("$._embedded.customers[0].country", is(CUSTOMER_1.getCountry())))
////                .andExpect(jsonPath("$._embedded.customers[0].city", is(CUSTOMER_1.getCity())))
////                .andExpect(jsonPath("$._embedded.customers[0].vatid", is(CUSTOMER_1.getVatid())));
////    }
////
////    @Test
////    public void testCreateCustomer() throws Exception {
////        String customerJson = json(new Customer(null,2.0,"newCompany","newStreet","newStreet2","79005", "Ukraine", "Lviv", 9999999.0));
////        this.mockMvc.perform(post("/rest/repository/customers")
////                .contentType("application/json;charset=UTF-8")
////                .content(customerJson))
////                .andExpect(status().isCreated());
////    }
////
////    @Test
////    public void testDeleteCustomer() throws Exception {
////        mockMvc.perform(delete("/rest/repository/customers/delete/240"));
////        mockMvc.perform(get("/rest/repository/customers/240"))
////                .andExpect(status().isNotFound());
////    }
////
////    @Test
////    public void testUpdateCustomer() throws Exception {
////        Customer updated = new Customer(CUSTOMER_1);
////        updated.setCity("Monte-Carlo");
////        updated.setCompanyName("Monte-Carlo Automobile");
////        updated.setCountry("Monaco");
////        updated.setCustomerId(5.0);
////        String customerJson = json(updated);
////        mockMvc.perform(put("/rest/repository/customers/240")
////                .contentType("application/json;charset=UTF-8")
////                .content(customerJson))
////                .andExpect(status().isOk());
////        mockMvc.perform(get("/rest/repository/customers/240"))
////                .andExpect(status().isOk())
////                .andExpect(content().contentType(contentType))
////                .andExpect(jsonPath("$.customerId", is(updated.getCustomerId())))
////                .andExpect(jsonPath("$.companyName", is(updated.getCompanyName())))
////                .andExpect(jsonPath("$.street", is(updated.getStreet())))
////                .andExpect(jsonPath("$.street2", is(updated.getStreet2())))
////                .andExpect(jsonPath("$.postcode", is(updated.getPostcode())))
////                .andExpect(jsonPath("$.country", is(updated.getCountry())))
////                .andExpect(jsonPath("$.city", is(updated.getCity())))
////                .andExpect(jsonPath("$.vatid", is(updated.getVatid())));
////    }
////
////    @Test
////    public void testAddUser() throws Exception {
////        mockMvc.perform(get("/rest/repository/customers/addUser?customerId=240&userId=53"))
////                .andExpect(status().isOk());
//////        mockMvc.perform(get("/rest/repository/customers/228"))
//////                .andExpect(status().isOk())
//////                .andExpect(jsonPath("$.users", hasSize(2)));
////    }
////
////    @Test
////    public void testRemoveUser() throws Exception {
////        mockMvc.perform(get("/rest/repository/customers/removeUser?customerId=240&userId=53"))
////                .andExpect(status().isOk());
//////        mockMvc.perform(get("/rest/repository/customers/228"))
//////                .andExpect(status().isOk())
//////                .andExpect(jsonPath("$.users", hasSize(1)));
////    }
//}
