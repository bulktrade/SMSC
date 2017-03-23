package io.smsc.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.smsc.AbstractSpringMVCTest;
import io.smsc.jwt.model.JWTUser;
import io.smsc.jwt.service.impl.JWTUserDetailsServiceImpl;
import io.smsc.model.admin.User;
import io.smsc.jwt.model.JWTAuthenticationRequest;
import io.smsc.jwt.model.JWTRefreshTokenRequest;
import io.smsc.model.customer.Salutation;
import org.assertj.core.util.DateUtil;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.FieldDescriptor;
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
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class JWTAuthenticationTest extends AbstractSpringMVCTest {

    @Test
    public void testLoginUser() throws Exception {
        mockMvc.perform(post("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTAuthenticationRequest("user", "password"))))
                .andExpect(status().isOk());
    }

    @Test
    public void testLoginAdmin() throws Exception {
        FieldDescriptor[] JWTAuthenticationRequestFields = new FieldDescriptor[]{
                fieldWithPath("username").description("User's username")
                        .attributes(key("mandatory").value(true)),
                fieldWithPath("password").description("User's password")
                .attributes(key("mandatory").value(true))
        };

        FieldDescriptor[] JWTAuthenticationResponseFields = new FieldDescriptor[]{
                fieldWithPath("token").description("Access token"),
                fieldWithPath("refreshToken").description("Refresh token")
        };

        mockMvc.perform(post("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTAuthenticationRequest("admin", "admin"))))
                .andExpect(status().isOk())
                .andDo(document("getTokens",
                        requestFields(JWTAuthenticationRequestFields),
                        responseFields(JWTAuthenticationResponseFields)));
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
    public void testLoginWithWrongPassword() throws Exception {
        mockMvc.perform(post("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTAuthenticationRequest("admin", "unknown"))))
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

        MvcResult result = mockMvc.perform(post("/rest/auth/token")
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
        Map<String, Object> claims = createClaims("2016-09-08T03:00:00");
        String fakeToken = jwtTokenGenerationService.generateAccessToken(claims);
        mockMvc.perform(get("/rest/repository/customers")
                .header(tokenHeader, fakeToken))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testRefreshToken() throws Exception {
        FieldDescriptor[] JWTRefreshTokenRequestFields = new FieldDescriptor[]{
                fieldWithPath("refreshToken").description("Refresh token")
                        .attributes(key("mandatory").value(true))
        };

        FieldDescriptor[] JWTRefreshTokenResponseFields = new FieldDescriptor[]{
                fieldWithPath("refreshedToken").description("New access token")
        };

        UserDetails adminDetails = createJWTUser();
        String refreshToken = jwtTokenGenerationService.generateRefreshToken(adminDetails);

        mockMvc.perform(put("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTRefreshTokenRequest(refreshToken))))
                .andExpect(status().isOk())
                .andDo(document("refreshToken",
                        requestFields(JWTRefreshTokenRequestFields),
                        responseFields(JWTRefreshTokenResponseFields)));
    }

    @Test
    public void testRefreshTokenWithInvalidRefreshToken() throws Exception {
        String invalidRefreshToken = "invalidToken";

        MvcResult result = mockMvc.perform(put("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTRefreshTokenRequest(invalidRefreshToken))))
                .andExpect(status().isUnauthorized())
                .andReturn();

        assertThat(result.getResponse().getErrorMessage()).isEqualTo("Refresh token is invalid. Please enter valid token");
    }

    @Test
    public void testRefreshTokenWithExpiredRefreshToken() throws Exception {
        String expiredRefreshToken = createExpiredToken();

        MvcResult result = mockMvc.perform(put("/rest/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json(new JWTRefreshTokenRequest(expiredRefreshToken))))
                .andExpect(status().isUnauthorized())
                .andReturn();

        assertThat(result.getResponse().getErrorMessage()).isEqualTo("Refresh token is invalid. Please enter valid token");
    }

    @Test
    public void testJwtAccessWithExpiredToken() throws Exception {
        mockMvc.perform(get("/rest/repository/users")
                .header(tokenHeader, createExpiredToken()))
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

    private JWTUser createJWTUser() {
        User admin = new User();
        admin.setId(2L);
        admin.setUsername("admin");
        admin.setPassword("admin");
        admin.setFirstname("adminName");
        admin.setSurname("adminSurname");
        admin.setEmail("admin@gmail.com");
        admin.setSalutation(Salutation.MR);
        admin.setActive(true);
        admin.setBlocked(false);

        return JWTUserDetailsServiceImpl.createJwtUser(admin);
    }

    private String createExpiredToken() {
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", "admin");
        claims.put("created", new Date(System.currentTimeMillis() - 100000));

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() - 10000))
                .signWith(SignatureAlgorithm.HS512, tokenSecret)
                .compact();
    }
}
