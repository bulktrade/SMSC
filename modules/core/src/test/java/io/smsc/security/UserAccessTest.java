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

public class UserAccessTest extends AbstractSpringMVCTest {

    private String userToken;

    @Before
    public void generateToken() throws Exception {
        UserDetails user = JWTUserDetailsServiceImpl.createJwtUser(userRepository.findByUsername("user"));
        userToken = jwtTokenGenerationService.generateAccessToken(user);
    }

    // Full access based on authorities

    @Test
    public void testUserReadAccess() throws Exception {
        mockMvc.perform(get("/rest/repository/customers/40000")
                .header(tokenHeader, userToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }

    @Test
    public void testUserCreateAccess() throws Exception {
        Customer customer = new Customer();
        customer.setCompanyName("userCompany");
        customer.setStreet("newStreet");
        customer.setStreet2("newStreet2");
        customer.setPostcode("79005");
        customer.setCountry("Ukraine");
        customer.setCity("Lviv");
        customer.setVatid("9999999.0");
        String customerJson = json(customer);

        mockMvc.perform(post("/rest/repository/customers")
                .with(csrf())
                .header(tokenHeader, userToken)
                .contentType("application/json;charset=UTF-8")
                .content(customerJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testUserWriteAccess() throws Exception {
        Customer customer = new Customer();
        customer.setId(40001L);
        customer.setCompanyName("userCompany");
        customer.setStreet("newStreet");
        customer.setStreet2("newStreet2");
        customer.setPostcode("79005");
        customer.setCountry("Ukraine");
        customer.setCity("Lviv");
        customer.setVatid("9999999.0");
        String customerJson = json(customer);

        mockMvc.perform(put("/rest/repository/customers/40001")
                .with(csrf())
                .header(tokenHeader, userToken)
                .contentType("application/json;charset=UTF-8")
                .content(customerJson))
                .andExpect(status().isOk());
    }

    @Test
    public void testUserDeleteAccess() throws Exception {
        mockMvc.perform(delete("/rest/repository/customers/40000")
                .with(csrf())
                .header(tokenHeader, userToken))
                .andExpect(status().isNoContent());
    }

}
