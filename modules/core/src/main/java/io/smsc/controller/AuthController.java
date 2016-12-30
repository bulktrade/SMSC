package io.smsc.controller;

import io.smsc.security.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
 * @author  Nazar Lipkovskyy
 * @version 1.0
 * @since   2016-12-30
 */
@RestController
public class AuthController {

    @Autowired
    private JWTTokenUtil jwtTokenUtil;

    @Autowired
    private JWTUserDetailsServiceImpl jwtUserDetailsService;

    @Value("${jwt.header}")
    protected String tokenHeader;

    /**
     * Method to receive {@link ResponseEntity} with {@link JWTAuthenticationResponse}
     * which contains access and refresh tokens.
     *
     * @param  request     the {@link JWTAuthenticationRequest} to take credentials from
     * @param  response    the {@link HttpServletResponse} to provide HTTP-specific
     * functionality in sending a response
     * @return             the {@link JWTAuthenticationResponse} with valid access and
     * refresh tokens
     * @throws IOException on input error
     */
    @PostMapping(path = "/rest/auth/token", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<JWTAuthenticationResponse> token(@RequestBody JWTAuthenticationRequest request, HttpServletResponse response) throws IOException {
        try {
            JWTUser jwtUser = jwtUserDetailsService.loadUserByUsername(request.getUsername());
            if (jwtUser.getPassword().equals(request.getPassword())) {
                JWTAuthenticationResponse token = new JWTAuthenticationResponse(jwtTokenUtil.generateAccessToken(jwtUser),jwtTokenUtil.generateRefreshToken(jwtUser));
                return new ResponseEntity<>(token, HttpStatus.OK);
            }
        } catch (Exception ex) {
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Credentials are invalid. Please enter valid username and password");
        return null;
    }

    /**
     * Method to receive {@link ResponseEntity} with {@link JWTRefreshTokenResponse}
     * which contains refreshed access token.
     *
     * @param  request     the {@link JWTRefreshTokenRequest} to take valid refresh
     * token and expired access token from
     * @param  response    the {@link HttpServletResponse} to provide HTTP-specific
     * functionality in sending a response
     * @return             the {@link JWTRefreshTokenResponse} with refreshed access token
     * @throws IOException on input error
     */
    @PutMapping(path = "/rest/auth/token", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<JWTRefreshTokenResponse> token(@RequestBody JWTRefreshTokenRequest request, HttpServletResponse response) throws IOException {
        try {
            String expiredAccessToken = request.getExpiredToken();
            String refreshToken = request.getRefreshToken();
            JWTUser jwtUser = jwtUserDetailsService.loadUserByUsername(jwtTokenUtil.getUsernameFromToken(refreshToken));
            if (jwtTokenUtil.validateToken(refreshToken, jwtUser) || jwtTokenUtil.getUsernameFromToken(expiredAccessToken).equals(jwtUser.getUsername())) {
                JWTRefreshTokenResponse token = new JWTRefreshTokenResponse(jwtTokenUtil.refreshToken(expiredAccessToken));
                return new ResponseEntity<>(token, HttpStatus.OK);
            }
        }
        catch (Exception ex) {
            // going to send error
        }
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Refresh or expired access token is invalid. Please enter valid tokens");
        return null;
    }
}
