package io.smsc.controller;

import io.smsc.security.JWTAuthenticationRequest;
import io.smsc.security.JWTAuthenticationResponse;
import io.smsc.security.JWTTokenUtil;
import io.smsc.security.JWTUserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

import java.net.URI;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
public class AuthController {

    @Autowired
    private JWTTokenUtil jwtTokenUtil;

    @Autowired
    private JWTUserDetailsServiceImpl jwtUserDetailsService;

    @PostMapping(path = "/rest/auth/token", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<JWTAuthenticationResponse> token(@RequestBody JWTAuthenticationRequest request, HttpServletResponse response) {
        try {
            UserDetails jwtUser = jwtUserDetailsService.loadUserByUsername(request.getUsername());
            if (jwtUser.getPassword().equals(request.getPassword())) {
                JWTAuthenticationResponse token = new JWTAuthenticationResponse(jwtTokenUtil.generateAccessToken(jwtUser),jwtTokenUtil.generateRefreshToken(jwtUser));
                return new ResponseEntity<>(token, HttpStatus.OK);
            }
        } catch (Exception ex) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
        return null;
    }
}
