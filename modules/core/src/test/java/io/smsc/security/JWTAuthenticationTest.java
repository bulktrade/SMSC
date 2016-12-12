package io.smsc.security;

import io.smsc.AbstractTest;
import org.assertj.core.util.DateUtil;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

public class JWTAuthenticationTest extends AbstractTest {

    @Test
    public void testLoginUser() throws Exception {
        MvcResult result = mockMvc.perform(post("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTAuthenticationRequest("User","password"))))
                .andExpect(status().isOk())
                .andReturn();
        System.out.println("Token for user: " + result.getResponse().getContentAsString());
    }

    @Test
    public void testLoginAdmin() throws Exception {
        MvcResult result = mockMvc.perform(post("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTAuthenticationRequest("Admin","admin"))))
                .andExpect(status().isOk())
                .andReturn();
        System.out.println("Token for admin: " + result.getResponse().getContentAsString());
    }

    @Test
    public void testLoginUnauthorized() throws Exception {
        mockMvc.perform(post("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTAuthenticationRequest("Unknown","unknown"))))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testGenerateTokenGeneratesDifferentTokensForDifferentCreationDates() throws Exception {
        final Map<String, Object> claims = createClaims("2016-09-08T03:00:00");
        final String token = jwtTokenUtil.generateAccessToken(claims);

        final Map<String, Object> claimsForLaterToken = createClaims("2016-09-08T08:00:00");
        final String laterToken = jwtTokenUtil.generateAccessToken(claimsForLaterToken);

        assertThat(token).isNotEqualTo(laterToken);
    }

    private Map<String, Object> createClaims(String creationDate) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(JWTTokenUtil.CLAIM_KEY_USERNAME, "testUser");
        claims.put(JWTTokenUtil.CLAIM_KEY_CREATED, DateUtil.parseDatetime(creationDate));
        return claims;
    }
}
