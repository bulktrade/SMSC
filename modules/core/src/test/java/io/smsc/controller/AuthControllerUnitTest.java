package io.smsc.controller;

import io.smsc.jwt.model.JWTAuthenticationRequest;
import io.smsc.jwt.model.JWTRefreshTokenRequest;
import io.smsc.jwt.model.JWTUser;
import io.smsc.jwt.service.JWTTokenGenerationService;
import io.smsc.jwt.service.JWTUserDetailsService;
import io.smsc.jwt.service.impl.JWTUserDetailsServiceImpl;
import io.smsc.model.admin.Authority;
import io.smsc.model.admin.Group;
import io.smsc.model.admin.Role;
import io.smsc.model.admin.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.servlet.http.HttpServletResponse;
import java.util.Collections;

import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class AuthControllerUnitTest {

    @Mock
    private JWTUserDetailsService userDetailsService;

    @Mock
    private JWTTokenGenerationService tokenGenerationService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private HttpServletResponse response;

    private final User user = new User();

    private final Group group = new Group();

    private final Role role = new Role();

    private final Authority authority = new Authority();

    private JWTUser jwtUser;

    private AuthController controller;

    @Before
    public void setup() {
        controller = new AuthController(tokenGenerationService, userDetailsService, passwordEncoder);

        role.setName("ROLE_ADMIN_USER");
        group.setName("GROUP_GROUP");
        authority.setName("AUTHORITY_AUTHORITY");
        user.setUsername("user");
        user.setPassword("password");
        user.setRoles(Collections.singleton(role));
        user.setAuthorities(Collections.singleton(authority));
        group.setAuthorities(Collections.singleton(authority));
        user.setGroups(Collections.singleton(group));
        jwtUser = JWTUserDetailsServiceImpl.createJwtUser(user);

        when(userDetailsService.loadUserByUsername(anyString())).thenReturn(jwtUser);
        when(tokenGenerationService.generateAccessToken(jwtUser)).thenReturn("accessToken");
        when(tokenGenerationService.generateRefreshToken(jwtUser)).thenReturn("refreshToken");
        when(tokenGenerationService.getUsernameFromToken(anyString())).thenReturn("user");
        when(passwordEncoder.matches(anyString(),anyString())).thenReturn(true);
    }

    @Test
    public void testGetTokens() throws Exception {
        controller.token(new JWTAuthenticationRequest("user","password"), response);

        verify(userDetailsService, times(1)).loadUserByUsername("user");
        verify(passwordEncoder, times(1)).matches("password", "password");
        verify(tokenGenerationService, times(1)).generateAccessToken(jwtUser);
        verify(tokenGenerationService, times(1)).generateRefreshToken(jwtUser);
    }

    @Test
    public void testRefreshToken() throws Exception {
        controller.token(new JWTRefreshTokenRequest("refreshToken"), response);

        verify(tokenGenerationService, times(1)).getUsernameFromToken("refreshToken");
        verify(userDetailsService, times(1)).loadUserByUsername("user");
        verify(tokenGenerationService, times(1)).generateAccessToken(jwtUser);
    }
}
