package io.smsc.repository.user;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.smsc.model.User;
import io.smsc.AbstractTest;
import io.smsc.security.JWTUserFactory;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class UserSpringSecurityTest extends AbstractTest {

    private String adminToken;

    private String userToken;

    @Before
    public void generateTokens() throws Exception {
        UserDetails user = JWTUserFactory.create(userRepository.findByUsername("User"));
        UserDetails admin = JWTUserFactory.create(userRepository.findByUsername("Admin"));
        userToken = jwtTokenUtil.generateAccessToken(user);
        adminToken = jwtTokenUtil.generateAccessToken(admin);
    }

    @Value("${jwt.header}")
    private String tokenHeader;

    @Test
    public void testGetUnauthorized() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isUnauthorized());
    }

//    @Test
//    public void testJwtUserAccessGranted() throws Exception {
//        mockMvc.perform(get("/rest/repository/users/search/findByEmail?email=user@gmail.com")
//                .header(tokenHeader,userToken))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(contentType));
//    }

    @Test
    public void testJwtUserGetAllAccessForbidden() throws Exception {
        mockMvc.perform(get("/rest/repository/users/findAll")
                .header(tokenHeader,userToken))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testJwtUserDeleteAccessForbidden() throws Exception {
        mockMvc.perform(delete("/rest/repository/users/delete/53")
                .header(tokenHeader,userToken))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testJwtUserSaveAccessForbidden() throws Exception {
        mockMvc.perform(post("/rest/repository/users/create")
                .header(tokenHeader,userToken)
                .contentType("application/json;charset=UTF-8")
                .content(json(new User(null,"Old Johnny","john123456","John","Forrester","john@gmail.com",true,false))))
                .andExpect(status().isForbidden());
    }

//    @Test
//    public void testJwtAdminFullAccess() throws Exception {
//        mockMvc.perform(get("/rest/repository/users/findAll")
//                .header(tokenHeader,adminToken))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(contentType));
//    }

    @Test
    public void testJwtAccessWithExpiredToken() throws Exception {
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", "Admin");
        claims.put("created", new Date(System.currentTimeMillis() - 100000));
        String expiredToken = Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() - 100000 ))
                .signWith(SignatureAlgorithm.HS512, tokenSecret)
                .compact();
        mockMvc.perform(get("/rest/repository/users/search/findAll")
                .header(tokenHeader,expiredToken))
                .andExpect(status().isUnauthorized());
    }
}
