package io.smsc.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.smsc.AbstractTest;
import io.smsc.jwt.service.impl.JWTUserDetailsServiceImpl;
import io.smsc.model.admin.User;
import io.smsc.jwt.model.JWTAuthenticationRequest;
import io.smsc.jwt.model.JWTRefreshTokenRequest;
import io.smsc.model.customer.Salutation;
import org.assertj.core.util.DateUtil;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static io.smsc.jwt.service.impl.JWTTokenGenerationServiceImpl.CLAIM_KEY_CREATED;
import static io.smsc.jwt.service.impl.JWTTokenGenerationServiceImpl.CLAIM_KEY_USERNAME;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class JWTAuthenticationTest extends AbstractTest {

    @Test
    public void testLoginUser() throws Exception {
        mockMvc.perform(post("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTAuthenticationRequest("user", "password"))))
                .andExpect(status().isOk());
    }

    @Test
    public void testLoginAdmin() throws Exception {
        mockMvc.perform(post("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTAuthenticationRequest("admin", "admin"))))
                .andExpect(status().isOk());
    }

    @Test
    public void testLoginDemo() throws Exception {
        mockMvc.perform(post("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTAuthenticationRequest("demo", "demo"))))
                .andExpect(status().isOk());
    }

    @Test
    public void testLoginUnauthorized() throws Exception {
        mockMvc.perform(post("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTAuthenticationRequest("Unknown", "unknown"))))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"POWER_ADMIN_USER"})
    public void testLoginWithoutAdminUserRole() throws Exception {
        User fake = new User();
        fake.setUsername("fake");
        fake.setPassword("fake");
        fake.setFirstname("fakeName");
        fake.setSurname("fakeSurname");
        fake.setEmail("fake@gmail.com");
        fake.setRoles(Collections.emptySet());
        fake.setActive(true);
        fake.setBlocked(false);
        fake.setSalutation(Salutation.MR);
        userRepository.save(fake);
        MvcResult result =  mockMvc.perform(post("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTAuthenticationRequest("fake", "fake"))))
                .andExpect(status().isUnauthorized())
                .andReturn();
        assertThat(result.getResponse().getErrorMessage()).isEqualTo("Current user has no appropriate roles. Please contact your administrator");
    }

    @Test
    public void testGetResourceWithoutToken() throws Exception {
        mockMvc.perform(get("/rest/repository/customers"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testGetResourceWithNotExistedUser() throws Exception {
        Map<String, Object> claims = new HashMap<>();
        claims.put(CLAIM_KEY_USERNAME, "fakeUser");
        claims.put(CLAIM_KEY_CREATED, new Date());
        String fakeToken = jwtTokenGenerationService.generateAccessToken(claims);
        mockMvc.perform(get("/rest/repository/customers")
                .header(tokenHeader, fakeToken))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testRefreshToken() throws Exception {
        User admin = new User();
        admin.setId(2L);
        admin.setUsername("admin");
        admin.setPassword("admin");
        admin.setFirstname("adminName");
        admin.setSurname("adminSurname");
        admin.setEmail("admin@gmail.com");
        admin.setActive(true);
        admin.setBlocked(false);
        UserDetails adminDetails = JWTUserDetailsServiceImpl.createJwtUser(admin);
        String expiredAccessToken = jwtTokenGenerationService.generateAccessToken(adminDetails);
        String refreshToken = jwtTokenGenerationService.generateRefreshToken(adminDetails);
        mockMvc.perform(put("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTRefreshTokenRequest(expiredAccessToken, refreshToken))))
                .andExpect(status().isOk());
    }

    @Test
    public void testRefreshTokenWithInvalidRefreshToken() throws Exception {
        User admin = new User();
        admin.setId(2L);
        admin.setUsername("admin");
        admin.setPassword("admin");
        admin.setFirstname("adminName");
        admin.setSurname("adminSurname");
        admin.setEmail("admin@gmail.com");
        admin.setActive(true);
        admin.setBlocked(false);
        UserDetails adminDetails = JWTUserDetailsServiceImpl.createJwtUser(admin);
        String expiredAccessToken = jwtTokenGenerationService.generateAccessToken(adminDetails);
        String invalidRefreshToken = "invalidToken";
        MvcResult result =  mockMvc.perform(put("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTRefreshTokenRequest(expiredAccessToken, invalidRefreshToken))))
                .andExpect(status().isUnauthorized())
                .andReturn();
        assertThat(result.getResponse().getErrorMessage()).isEqualTo("Refresh or expired access token is invalid. Please enter valid tokens");
    }

    @Test
    public void testJwtAccessWithExpiredToken() throws Exception {
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", "admin");
        claims.put("created", new Date(System.currentTimeMillis() - 100000));
        String expiredToken = Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() - 100000))
                .signWith(SignatureAlgorithm.HS512, tokenSecret)
                .compact();
        mockMvc.perform(get("/rest/repository/users")
                .header(tokenHeader, expiredToken))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testGenerateTokenGeneratesDifferentTokensForDifferentCreationDates() throws Exception {
        final Map<String, Object> claims = createClaims("2016-09-08T03:00:00");
        final String token = jwtTokenGenerationService.generateAccessToken(claims);

        final Map<String, Object> claimsForLaterToken = createClaims("2016-09-08T08:00:00");
        final String laterToken = jwtTokenGenerationService.generateAccessToken(claimsForLaterToken);

        assertThat(token).isNotEqualTo(laterToken);
    }

    @Test
    public void testGetUsernameFromEmptyToken() throws Exception {
        mockMvc.perform(get("/rest/repository/users")
                .header(tokenHeader, ""))
                .andExpect(status().isUnauthorized());
    }

    private Map<String, Object> createClaims(String creationDate) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(CLAIM_KEY_USERNAME, "testUser");
        claims.put(CLAIM_KEY_CREATED, DateUtil.parseDatetime(creationDate));
        return claims;
    }
}
