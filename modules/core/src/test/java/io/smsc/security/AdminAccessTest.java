package io.smsc.security;

import io.smsc.AbstractTest;
import io.smsc.jwt.service.impl.JWTUserDetailsServiceImpl;
import io.smsc.model.customer.Customer;
import org.junit.Before;
import org.junit.Test;
import org.springframework.security.core.userdetails.UserDetails;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class AdminAccessTest extends AbstractTest {

    private String adminToken;

    @Before
    public void generateTokens() throws Exception {
        UserDetails admin = JWTUserDetailsServiceImpl.createJwtUser(userRepository.findByUsername("admin"));
        adminToken = jwtTokenGenerationService.generateAccessToken(admin);
    }

    // Full access based on role

    @Test
    public void testAdminReadAccess() throws Exception {
        mockMvc.perform(get("/rest/repository/customers/40000")
                .header(tokenHeader, adminToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }

    @Test
    public void testAdminCreateAccess() throws Exception {
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
                .header(tokenHeader, adminToken)
                .contentType("application/json;charset=UTF-8")
                .content(customerJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testAdminWriteAccess() throws Exception {
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
                .header(tokenHeader, adminToken)
                .contentType("application/json;charset=UTF-8")
                .content(customerJson))
                .andExpect(status().isOk());
    }

    @Test
    public void testAdminDeleteAccess() throws Exception {
        mockMvc.perform(delete("/rest/repository/customers/40000")
                .with(csrf())
                .header(tokenHeader, adminToken))
                .andExpect(status().isNoContent());
    }
}
