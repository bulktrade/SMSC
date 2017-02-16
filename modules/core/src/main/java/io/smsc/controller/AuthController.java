package io.smsc.controller;

import io.smsc.jwt.model.*;
import io.smsc.jwt.service.JWTTokenGenerationService;
import io.smsc.jwt.service.JWTUserDetailsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    public AuthController(JWTTokenGenerationService jwtTokenGenerationService, JWTUserDetailsService jwtUserDetailsService) {
        this.jwtTokenGenerationService = jwtTokenGenerationService;
        this.jwtUserDetailsService = jwtUserDetailsService;
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
            if (jwtUser.getPassword().equals(request.getPassword())) {
                JWTAuthenticationResponse token = new JWTAuthenticationResponse(jwtTokenGenerationService.generateAccessToken(jwtUser), jwtTokenGenerationService.generateRefreshToken(jwtUser));
                return new ResponseEntity<>(token, HttpStatus.OK);
            }
        } catch (Exception ex) {
            LOG.debug("Some exception occurred", ex);
            // going to send error
        }

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Credentials are invalid. Please enter valid username and password");
        return null;
    }

    /**
     * Method to receive {@link ResponseEntity} with {@link JWTRefreshTokenResponse}
     * which contains refreshed access token.
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
            String expiredAccessToken = request.getExpiredToken();
            String refreshToken = request.getRefreshToken();
            JWTUser jwtUser = jwtUserDetailsService.loadUserByUsername(jwtTokenGenerationService.getUsernameFromToken(refreshToken));
            if (jwtTokenGenerationService.validateToken(refreshToken, jwtUser) || jwtTokenGenerationService.getUsernameFromToken(expiredAccessToken).equals(jwtUser.getUsername())) {
                JWTRefreshTokenResponse token = new JWTRefreshTokenResponse(jwtTokenGenerationService.refreshToken(expiredAccessToken));
                return new ResponseEntity<>(token, HttpStatus.OK);
            }
        } catch (Exception ex) {
            LOG.debug("Some exception occurred", ex);
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Refresh or expired access token is invalid. Please enter valid tokens");
        return null;
    }
}
