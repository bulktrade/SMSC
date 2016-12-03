package io.smsc.security;

import io.smsc.model.User;
import io.smsc.repository.AbstractRepositoryTest;
import io.smsc.repository.user.UserRepository;
import org.assertj.core.util.DateUtil;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.mobile.device.Device;
import org.springframework.mobile.device.DevicePlatform;

import java.util.HashMap;
import java.util.Map;

import static io.smsc.test_data.UserTestData.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

public class JWTAuthorizationTest extends AbstractRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTTokenUtil jwtTokenUtil;

    @Value("${jwt.header}")
    private String tokenHeader;

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();
    }

    @Test
    public void testGenerateTokenGeneratesDifferentTokensForDifferentCreationDates() throws Exception {
        final Map<String, Object> claims = createClaims("2016-09-08T03:00:00");
        final String token = jwtTokenUtil.generateToken(claims);

        final Map<String, Object> claimsForLaterToken = createClaims("2016-09-08T08:00:00");
        final String laterToken = jwtTokenUtil.generateToken(claimsForLaterToken);

        assertThat(token).isNotEqualTo(laterToken);
    }

    @Test
    public void testGetUnauthorized() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testJwtUserAuthentication() throws Exception {
        User user = userRepository.findByEmail("user@gmail.com");
        JWTUser jwtUser = JWTUserFactory.create(user);
        String token = jwtTokenUtil.generateToken(jwtUser, getNormalDevice());
        mockMvc.perform(get("/")
                .header(tokenHeader,token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.TEXT_PLAIN));
    }

    @Test
    public void testJwtUserAccessGranted() throws Exception {
        User user = userRepository.findByEmail("user@gmail.com");
        JWTUser jwtUser = JWTUserFactory.create(user);
        String token = jwtTokenUtil.generateToken(jwtUser, getNormalDevice());
        mockMvc.perform(get("/rest/repository/users/" + USER_ID)
                .header(tokenHeader,token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }

    @Test
    public void testJwtUserAccessForbidden() throws Exception {
        User user = userRepository.findByEmail("user@gmail.com");
        JWTUser jwtUser = JWTUserFactory.create(user);
        String token = jwtTokenUtil.generateToken(jwtUser, getNormalDevice());
        mockMvc.perform(get("/rest/repository/users")
                .header(tokenHeader,token))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testJwtAdminAuthentication() throws Exception {
        User admin = userRepository.findByEmail("admin@gmail.com");
        JWTUser jwtAdmin = JWTUserFactory.create(admin);
        String token = jwtTokenUtil.generateToken(jwtAdmin, getNormalDevice());
        mockMvc.perform(get("/")
                .header(tokenHeader,token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.TEXT_PLAIN));
    }

    @Test
    public void testJwtAdminFullAccess() throws Exception {
        User admin = userRepository.findByEmail("admin@gmail.com");
        JWTUser jwtAdmin = JWTUserFactory.create(admin);
        String token = jwtTokenUtil.generateToken(jwtAdmin, getNormalDevice());
        mockMvc.perform(get("/rest/repository/users")
                .header(tokenHeader,token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }

    private Map<String, Object> createClaims(String creationDate) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(JWTTokenUtil.CLAIM_KEY_USERNAME, "testUser");
        claims.put(JWTTokenUtil.CLAIM_KEY_AUDIENCE, "testAudience");
        claims.put(JWTTokenUtil.CLAIM_KEY_CREATED, DateUtil.parseDatetime(creationDate));
        return claims;
    }

//    private static void mockAuthorize(JWTUser jwtUser) {
//        SecurityContextHolder.getContext().setAuthentication(
//                new UsernamePasswordAuthenticationToken(jwtUser, null, jwtUser.getAuthorities()));
//    }
//
//    private static RequestPostProcessor userHttpBasic(User user) {
//        return SecurityMockMvcRequestPostProcessors.httpBasic(user.getEmail(), user.getPassword());
//    }
//
//    private static RequestPostProcessor userAuth(User user) {
//        return SecurityMockMvcRequestPostProcessors.authentication(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
//    }

    private static Device getNormalDevice(){
        return new Device() {
            @Override
            public boolean isNormal() {
                return true;
            }

            @Override
            public boolean isMobile() {
                return false;
            }

            @Override
            public boolean isTablet() {
                return false;
            }

            @Override
            public DevicePlatform getDevicePlatform() {
                return DevicePlatform.UNKNOWN;
            }
        };
    }
}
