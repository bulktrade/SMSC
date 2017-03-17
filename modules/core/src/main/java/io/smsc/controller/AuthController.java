package io.smsc.controller;

import io.smsc.jwt.model.*;
import io.smsc.jwt.service.JWTTokenGenerationService;
import io.smsc.jwt.service.JWTUserDetailsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

/**
 * The AuthController class is used for mapping HTTP requests for receiving and updating
 * access and refresh tokens onto specific methods
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RestController
public class AuthController {

    private static final Logger LOG = LoggerFactory.getLogger(AuthController.class);

    private final JWTTokenGenerationService jwtTokenGenerationService;

    private final JWTUserDetailsService jwtUserDetailsService;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(JWTTokenGenerationService jwtTokenGenerationService, JWTUserDetailsService jwtUserDetailsService, PasswordEncoder passwordEncoder) {
        this.jwtTokenGenerationService = jwtTokenGenerationService;
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Method to receive {@link ResponseEntity} with {@link JWTAuthenticationResponse}
     * which contains access and refresh tokens.
     *
     * @param request  the {@link JWTAuthenticationRequest} to take credentials from
     * @param response the {@link HttpServletResponse} to provide HTTP-specific
     *                 functionality in sending a response
     * @return the {@link JWTAuthenticationResponse} with valid access and
     * refresh tokens
     * @throws IOException on input error
     */
    @PostMapping(path = "/rest/auth/token", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<JWTAuthenticationResponse> token(@RequestBody JWTAuthenticationRequest request, HttpServletResponse response) throws IOException {
        try {
            JWTUser jwtUser = jwtUserDetailsService.loadUserByUsername(request.getUsername());
            Boolean hasRoles = false;
            for (GrantedAuthority authority : jwtUser.getAuthorities()) {
                if (authority.getAuthority().equals("ROLE_ADMIN_USER") || authority.getAuthority().equals("ROLE_POWER_ADMIN_USER")) {
                    hasRoles = true;
                    break;
                }
            }

            if (!hasRoles) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Current user has no appropriate roles. Please contact your administrator");
                return null;
            }

            if (passwordEncoder.matches(request.getPassword(), jwtUser.getPassword())) {
                JWTAuthenticationResponse token = new JWTAuthenticationResponse(jwtTokenGenerationService.generateAccessToken(jwtUser),
                        jwtTokenGenerationService.generateRefreshToken(jwtUser));
                return new ResponseEntity<>(token, HttpStatus.OK);
            }

            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Credentials are invalid. Please enter valid username and password");
            return null;
        } catch (UsernameNotFoundException ex) {
            LOG.debug("Invalid credentials", ex);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Credentials are invalid. Please enter valid username and password");
            return null;
        }
    }

    /**
     * Method to receive {@link ResponseEntity} with {@link JWTRefreshTokenResponse}
     * which contains new access token.
     *
     * @param request  the {@link JWTRefreshTokenRequest} to take valid refresh
     *                 token and expired access token from
     * @param response the {@link HttpServletResponse} to provide HTTP-specific
     *                 functionality in sending a response
     * @return the {@link JWTRefreshTokenResponse} with refreshed access token
     * @throws IOException on input error
     */
    @PutMapping(path = "/rest/auth/token", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<JWTRefreshTokenResponse> token(@RequestBody JWTRefreshTokenRequest request, HttpServletResponse response) throws IOException {
        try {
            String refreshToken = request.getRefreshToken();
            JWTUser jwtUser = jwtUserDetailsService.loadUserByUsername(jwtTokenGenerationService.getUsernameFromToken(refreshToken));
            JWTRefreshTokenResponse token = new JWTRefreshTokenResponse(jwtTokenGenerationService.generateAccessToken(jwtUser));
            return new ResponseEntity<>(token, HttpStatus.OK);

        } catch (UsernameNotFoundException ex) {
            LOG.debug("Invalid access token", ex);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Refresh token is invalid. Please enter valid token");
            return null;
        }
    }
}
