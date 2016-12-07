package io.smsc.security;

import io.smsc.model.User;
import io.smsc.AbstractTest;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Value;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

public class SpringSecurityTest extends AbstractTest {

    private final String adminToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImNyZWF0ZWQiOjE0ODExMjU0MDM0NzN9.gt9v1ayuZFu8xm4lPH92BQdtWG9N2BVu69Mt5ILLj3VaXwerD3I1zX-TgmG2JY84pr31trdjgWzI5ZqCGxTLHg";

    private final String userToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJVc2VyIiwiY3JlYXRlZCI6MTQ4MTEyNjgzMTg0Nn0.5lmGI6mkod0ulN10V1ggJO85CDKLmnjqmbltbH7YEvn0b0Mz6v5GyC4FwE3MO5vnfbNjNyiqKqd8asqfHoVC7A";

    @Value("${jwt.header}")
    private String tokenHeader;

    @Test
    public void testGetUnauthorized() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testJwtUserAccessGranted() throws Exception {
        mockMvc.perform(get("/rest/repository/users/search/findByEmail?email=user@gmail.com")
                .header(tokenHeader,userToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }

    @Test
    public void testJwtUserGetAllAccessForbidden() throws Exception {
        mockMvc.perform(get("/rest/repository/users/search/findAll")
                .header(tokenHeader,userToken))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testJwtUserDeleteAccessForbidden() throws Exception {
        mockMvc.perform(delete("/rest/repository/users/1")
                .header(tokenHeader,userToken))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testJwtUserSaveAccessForbidden() throws Exception {
        mockMvc.perform(post("/rest/repository/users")
                .header(tokenHeader,userToken)
                .content(json(new User(null,"Old Johnny","john123456","John","Forrester","john@gmail.com",true,false))))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testJwtAdminFullAccess() throws Exception {
        mockMvc.perform(get("/rest/repository/users/search/findAll")
                .header(tokenHeader,adminToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }
}
