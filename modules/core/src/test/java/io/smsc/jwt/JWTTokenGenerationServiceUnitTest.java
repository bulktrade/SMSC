package io.smsc.jwt;

import io.jsonwebtoken.Jwts;
import io.smsc.jwt.model.JWTUser;
import io.smsc.jwt.service.impl.JWTTokenGenerationServiceImpl;
import io.smsc.jwt.service.impl.JWTUserDetailsServiceImpl;
import io.smsc.model.admin.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PowerMockIgnore;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

import static org.mockito.Matchers.anyString;
import static org.powermock.api.mockito.PowerMockito.when;
import static org.powermock.api.support.membermodification.MemberMatcher.method;

@RunWith(PowerMockRunner.class)
@PrepareForTest(JWTTokenGenerationServiceImpl.class)
@PowerMockIgnore({"javax.crypto.*"})
public class JWTTokenGenerationServiceUnitTest {

    private String token;

    private JWTTokenGenerationServiceImpl tokenGenerationService;

    private JWTUser user;

    @Before
    public void setUp() throws Exception {
        tokenGenerationService = PowerMockito.spy(new JWTTokenGenerationServiceImpl());

        ReflectionTestUtils.setField(tokenGenerationService, "expiration", 3600L);
        ReflectionTestUtils.setField(tokenGenerationService, "secret", "smsc.io");

        User admin = new User();
        admin.setId(2L);
        admin.setUsername("admin");
        admin.setPassword("admin");
        admin.setFirstname("adminName");
        admin.setSurname("adminSurname");
        admin.setEmail("admin@gmail.com");
        admin.setActive(true);
        admin.setBlocked(false);
        user = JWTUserDetailsServiceImpl.createJwtUser(admin);
        token = tokenGenerationService.generateAccessToken(user);
    }

    @Test
    public void getUsernameFromTokenWithClaims() throws Exception {
        assertThat(tokenGenerationService.getUsernameFromToken(token)).isEqualTo("admin");
    }

    @Test
    public void getUsernameFromTokenWithEmptyClaims() throws Exception {
        when(tokenGenerationService, method(JWTTokenGenerationServiceImpl.class, "getClaimsFromToken", String.class))
                .withArguments(anyString())
                .thenReturn(Jwts.claims());

        assertThat(tokenGenerationService.getUsernameFromToken(token)).isEqualTo(null);
    }

    @Test
    public void getUsernameFromTokenWithoutClaims() throws Exception {
        when(tokenGenerationService, method(JWTTokenGenerationServiceImpl.class, "getClaimsFromToken", String.class))
                .withArguments(anyString())
                .thenReturn(null);

        assertThat(tokenGenerationService.getUsernameFromToken(token)).isEqualTo(null);
    }

    @Test
    public void getUsernameFromTokenWithoutSecret() throws Exception {
        ReflectionTestUtils.setField(tokenGenerationService, "secret", null);

        assertThat(tokenGenerationService.getUsernameFromToken(token)).isEqualTo(null);
    }

    @Test
    public void getUsernameFromTokenWithFakeSecret() throws Exception {
        ReflectionTestUtils.setField(tokenGenerationService, "secret", "Fake");

        assertThat(tokenGenerationService.getUsernameFromToken(token)).isEqualTo(null);
    }

    @Test
    public void getUsernameFromExpiredToken() throws Exception {
        when(tokenGenerationService, method(JWTTokenGenerationServiceImpl.class, "generateExpirationDateForAccessToken"))
                .withNoArguments()
                .thenReturn(new Date(System.currentTimeMillis() - 10000));
        String expiredToken = tokenGenerationService.generateAccessToken(user);

        assertThat(tokenGenerationService.getUsernameFromToken(expiredToken)).isEqualTo(null);
    }

}
