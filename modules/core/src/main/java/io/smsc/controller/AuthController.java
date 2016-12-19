package io.smsc.controller;

import io.smsc.security.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.net.URI;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
public class AuthController {

    @Autowired
    private JWTTokenUtil jwtTokenUtil;

    @Autowired
    private JWTUserDetailsServiceImpl jwtUserDetailsService;

    @Value("${jwt.header}")
    protected String tokenHeader;

    // Receive Access and Refresh tokens
    // @RequestBody - JSON value of valid username and password
    // ResponseEntity - JSON value of new AccessToken and new RefreshToken
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

    // Refresh Access token
    // @RequestBody - JSON value of expired AccessToken and not expired RefreshToken
    // ResponseEntity - JSON value of refreshed AccessToken
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
