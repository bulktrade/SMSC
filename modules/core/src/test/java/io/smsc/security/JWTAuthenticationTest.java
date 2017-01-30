//package io.smsc.security;
//
//import io.smsc.AbstractTest;
//import io.smsc.security.model.JWTAuthenticationRequest;
//import io.smsc.security.model.JWTRefreshTokenRequest;
//import io.smsc.security.service.JWTTokenGenerationServiceImpl;
//import org.assertj.core.util.DateUtil;
//import org.junit.Test;
//import org.springframework.http.MediaType;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.test.web.servlet.MvcResult;
//
//import java.util.HashMap;
//import java.util.Map;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//public class JWTAuthenticationTest extends AbstractTest {
////
////    @Test
////    public void testLoginUser() throws Exception {
////        MvcResult result = mockMvc.perform(post("/rest/auth/token")
////                .contentType(MediaType.APPLICATION_JSON)
////                .content(json(new JWTAuthenticationRequest("user","password"))))
////                .andExpect(status().isOk())
////                .andReturn();
////        System.out.println("Token for user: " + result.getResponse().getContentAsString());
////    }
////
////    @Test
////    public void testLoginAdmin() throws Exception {
////        MvcResult result = mockMvc.perform(post("/rest/auth/token")
////                .contentType(MediaType.APPLICATION_JSON)
////                .content(json(new JWTAuthenticationRequest("admin","admin"))))
////                .andExpect(status().isOk())
////                .andReturn();
////        System.out.println("Token for admin: " + result.getResponse().getContentAsString());
////    }
////
////    @Test
////    public void testLoginUnauthorized() throws Exception {
////        mockMvc.perform(post("/rest/auth/token")
////                .contentType(MediaType.APPLICATION_JSON)
////                .content(json(new JWTAuthenticationRequest("Unknown","unknown"))))
////                .andExpect(status().isUnauthorized());
////    }
////
////    @Test
////    public void testRefreshToken() throws Exception {
////        UserDetails admin = JWTUserFactory.create(userRepository.findByUsername("admin"));
////        String expiredAccessToken = jwtTokenGenerationService.generateAccessToken(admin);
////        String refreshToken = jwtTokenGenerationService.generateRefreshToken(admin);
////        MvcResult result = mockMvc.perform(put("/rest/auth/token")
////                .contentType(MediaType.APPLICATION_JSON)
////                .content(json(new JWTRefreshTokenRequest(expiredAccessToken,refreshToken))))
////                .andExpect(status().isOk())
////                .andReturn();
////        System.out.println("Refreshed token: " + result.getResponse().getContentAsString());
////    }
////
////    @Test
////    public void testGenerateTokenGeneratesDifferentTokensForDifferentCreationDates() throws Exception {
////        final Map<String, Object> claims = createClaims("2016-09-08T03:00:00");
////        final String token = jwtTokenGenerationService.generateAccessToken(claims);
////
////        final Map<String, Object> claimsForLaterToken = createClaims("2016-09-08T08:00:00");
////        final String laterToken = jwtTokenGenerationService.generateAccessToken(claimsForLaterToken);
////
////        assertThat(token).isNotEqualTo(laterToken);
////    }
////
////    private Map<String, Object> createClaims(String creationDate) {
////        Map<String, Object> claims = new HashMap<>();
////        claims.put(JWTTokenGenerationServiceImpl.CLAIM_KEY_USERNAME, "testUser");
////        claims.put(JWTTokenGenerationServiceImpl.CLAIM_KEY_CREATED, DateUtil.parseDatetime(creationDate));
////        return claims;
////    }
//}
