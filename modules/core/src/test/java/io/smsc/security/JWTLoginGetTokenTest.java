package io.smsc.security;

import io.smsc.controller.LoginCredentials;
import io.smsc.repository.AbstractRepositoryTest;
import org.junit.Before;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

public class JWTLoginGetTokenTest extends AbstractRepositoryTest {

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();
    }

    @Test
    public void testLoginUser() throws Exception {
        MvcResult result = mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new LoginCredentials("User","password"))))
                .andExpect(status().isOk())
                .andReturn();
        System.out.println("Token for user: " + result.getResponse().getHeader("Token"));
        System.out.println("User response body: " + result.getResponse().getContentAsString());
    }

    @Test
    public void testLoginAdmin() throws Exception {
        MvcResult result = mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new LoginCredentials("Admin","admin"))))
                .andExpect(status().isOk())
                .andReturn();
        System.out.println("Token for admin: " + result.getResponse().getHeader("Token"));
        System.out.println("Admin response body: " + result.getResponse().getContentAsString());
    }

    @Test
    public void testLoginUnauthorized() throws Exception {
        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new LoginCredentials("Unknown","unknown"))))
                .andExpect(status().isUnauthorized());
    }
}
