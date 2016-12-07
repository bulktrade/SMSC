package io.smsc.controller;

import io.smsc.security.JWTAuthenticationRequest;
import io.smsc.security.JWTTokenUtil;
import io.smsc.security.JWTUserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mobile.device.Device;
import org.springframework.mobile.device.DevicePlatform;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
public class LoginController {

    @Autowired
    private JWTTokenUtil jwtTokenUtil;

    @Autowired
    private JWTUserDetailsServiceImpl jwtUserDetailsService;

    @PostMapping(path = "/login", consumes = APPLICATION_JSON_VALUE)
    public void login(@RequestBody JWTAuthenticationRequest request, HttpServletResponse response) {
        try {
            UserDetails jwtUser = jwtUserDetailsService.loadUserByUsername(request.getUsername());
            if (jwtUser.getPassword().equals(request.getPassword())) {
                response.setHeader("Token", jwtTokenUtil.generateToken(jwtUser));
            }
        } catch (NullPointerException ex) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}
