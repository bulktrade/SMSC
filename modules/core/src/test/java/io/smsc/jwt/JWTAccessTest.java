package io.smsc.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.smsc.model.admin.User;
import io.smsc.AbstractTest;
import io.smsc.model.customer.Salutation;
import io.smsc.repository.admin.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class JWTAccessTest extends AbstractTest {

    private String adminToken;

    private String userToken;

    @Value("${jwt.header}")
    private String tokenHeader;

    @Value("${jwt.secret}")
    private String tokenSecret;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void generateTokens() throws Exception {
        UserDetails user = JWTUserFactory.create(userRepository.findByUsername("user"));
        UserDetails admin = JWTUserFactory.create(userRepository.findByUsername("admin"));
        userToken = jwtTokenGenerationService.generateAccessToken(user);
        adminToken = jwtTokenGenerationService.generateAccessToken(admin);
    }

    @Test
    public void testGetUnauthorized() throws Exception {
        mockMvc.perform(get("/rest/repository"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testJwtUserAccessGranted() throws Exception {
        mockMvc.perform(get("/rest/repository/users/search/findByEmail?email=user@gmail.com")
                .header(tokenHeader, userToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }

    @Test
    public void testJwtUserGetAllAccessForbidden() throws Exception {
        mockMvc.perform(get("/rest/repository/users")
                .header(tokenHeader, userToken))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testJwtUserDeleteAccessForbidden() throws Exception {
        mockMvc.perform(delete("/rest/repository/users/1")
                .header(tokenHeader, userToken))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testJwtUserSaveAccessForbidden() throws Exception {
        User user = new User();
        user.setUsername("Old Johnny");
        user.setPassword("john123456");
        user.setFirstname("John");
        user.setSurname("Forrester");
        user.setEmail("john@gmail.com");
        user.setSalutation(Salutation.MR);
        user.setActive(true);
        user.setBlocked(false);
        String userJson = json(user);
        // json is ignoring password
        userJson = userJson.substring(0, userJson.length() - 1).concat(", \"password\" : \"john123456\" \r\n }");
        mockMvc.perform(post("/rest/repository/users")
                .header(tokenHeader, userToken)
                .contentType("application/json;charset=UTF-8")
                .content(userJson))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testJwtAdminFullAccess() throws Exception {
        mockMvc.perform(get("/rest/repository/users")
                .header(tokenHeader, adminToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
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
}
