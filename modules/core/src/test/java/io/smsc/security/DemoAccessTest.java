package io.smsc.security;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.jwt.service.impl.JWTUserDetailsServiceImpl;
import io.smsc.model.customer.Customer;
import org.junit.Before;
import org.junit.Test;
import org.springframework.security.core.userdetails.UserDetails;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class DemoAccessTest extends AbstractSpringMVCTest {

    private String demoToken;

    @Before
    public void generateToken() throws Exception {
        UserDetails demo = JWTUserDetailsServiceImpl.createJwtUser(userRepository.findByUsername("demo"));
        demoToken = jwtTokenGenerationService.generateAccessToken(demo);
    }

    // Read-only access

    @Test
    public void testDemoReadAccess() throws Exception {
        mockMvc.perform(get("/rest/repository/customers/40000")
                .header(tokenHeader, demoToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }

    @Test
    public void testDemoCreateAccess() throws Exception {
        Customer customer = new Customer();
        customer.setCompanyName("demoCompany");
        customer.setStreet("newStreet");
        customer.setStreet2("newStreet2");
        customer.setPostcode("79005");
        customer.setCountry("Ukraine");
        customer.setCity("Lviv");
        customer.setVatid("9999999.0");
        String customerJson = json(customer);
        System.out.println(customerJson);

        mockMvc.perform(post("/rest/repository/customers")
                .with(csrf())
                .header(tokenHeader, demoToken)
                .contentType("application/json;charset=UTF-8")
                .content(customerJson))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testDemoWriteAccess() throws Exception {
        Customer customer = new Customer();
        customer.setId(40001L);
        customer.setCompanyName("demoCompany");
        customer.setStreet("newStreet");
        customer.setStreet2("newStreet2");
        customer.setPostcode("79005");
        customer.setCountry("Ukraine");
        customer.setCity("Lviv");
        customer.setVatid("9999999.0");
        String customerJson = json(customer);

        mockMvc.perform(put("/rest/repository/customers/40001")
                .with(csrf())
                .header(tokenHeader, demoToken)
                .contentType("application/json;charset=UTF-8")
                .content(customerJson))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testDemoDeleteAccess() throws Exception {
        mockMvc.perform(delete("/rest/repository/customers/40000")
                .with(csrf())
                .header(tokenHeader, demoToken))
                .andExpect(status().isForbidden());
    }
}
