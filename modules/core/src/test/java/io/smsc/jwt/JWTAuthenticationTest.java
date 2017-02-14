package io.smsc.jwt;

import io.smsc.AbstractTest;
import io.smsc.model.Role;
import io.smsc.model.user.User;
import io.smsc.jwt.model.JWTAuthenticationRequest;
import io.smsc.jwt.model.JWTRefreshTokenRequest;
import io.smsc.jwt.service.JWTTokenGenerationServiceImpl;
import org.assertj.core.util.DateUtil;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class JWTAuthenticationTest extends AbstractTest {

    @Test
    public void testLoginUser() throws Exception {
        MvcResult result = mockMvc.perform(post("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTAuthenticationRequest("user", "password"))))
                .andExpect(status().isOk())
                .andReturn();
        System.out.println("Tokens for user: " + result.getResponse().getContentAsString());
    }

    @Test
    public void testLoginAdmin() throws Exception {
        MvcResult result = mockMvc.perform(post("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTAuthenticationRequest("admin", "admin"))))
                .andExpect(status().isOk())
                .andReturn();
        System.out.println("Tokens for admin: " + result.getResponse().getContentAsString());
    }

    @Test
    public void testLoginUnauthorized() throws Exception {
        mockMvc.perform(post("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTAuthenticationRequest("Unknown", "unknown"))))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testGetResourceWithoutToken() throws Exception {
        mockMvc.perform(get("/rest/repository/customers"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testRefreshToken() throws Exception {
        User admin = new User();
        Role role = new Role();
        role.setId(2L);
        role.setName("ROLE_ADMIN");
        admin.setId(2L);
        admin.setUsername("admin");
        admin.setPassword("admin");
        admin.setFirstname("adminName");
        admin.setSurname("adminSurname");
        admin.setEmail("admin@gmail.com");
        admin.setActive(true);
        admin.setBlocked(false);
        admin.setRoles(Collections.singleton(role));
        UserDetails adminDetails = JWTUserFactory.create(admin);
        String expiredAccessToken = jwtTokenGenerationService.generateAccessToken(adminDetails);
        String refreshToken = jwtTokenGenerationService.generateRefreshToken(adminDetails);
        MvcResult result = mockMvc.perform(put("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTRefreshTokenRequest(expiredAccessToken, refreshToken))))
                .andExpect(status().isOk())
                .andReturn();
        System.out.println("Refreshed token: " + result.getResponse().getContentAsString());
    }

    @Test
    public void testGenerateTokenGeneratesDifferentTokensForDifferentCreationDates() throws Exception {
        final Map<String, Object> claims = createClaims("2016-09-08T03:00:00");
        final String token = jwtTokenGenerationService.generateAccessToken(claims);

        final Map<String, Object> claimsForLaterToken = createClaims("2016-09-08T08:00:00");
        final String laterToken = jwtTokenGenerationService.generateAccessToken(claimsForLaterToken);

        assertThat(token).isNotEqualTo(laterToken);
    }

    private Map<String, Object> createClaims(String creationDate) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(JWTTokenGenerationServiceImpl.CLAIM_KEY_USERNAME, "testUser");
        claims.put(JWTTokenGenerationServiceImpl.CLAIM_KEY_CREATED, DateUtil.parseDatetime(creationDate));
        return claims;
    }
}
