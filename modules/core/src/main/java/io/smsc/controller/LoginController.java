package io.smsc.controller;

import io.smsc.security.JWTTokenUtil;
import io.smsc.security.JWTUser;
import io.smsc.security.service.JWTUserDetailsServiceImpl;
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

    @PostMapping(path = "/login", produces = APPLICATION_JSON_VALUE)
    public UserDetails login(@RequestBody LoginCredentials credentials, HttpServletResponse response) {
        UserDetails jwtUser;
        try {
            jwtUser = jwtUserDetailsService.loadUserByUsername(credentials.getUserName());
        }
        catch (NullPointerException ex){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        }
        if (jwtUser.getPassword().equals(credentials.getPassword())) {
            response.setHeader("Token", jwtTokenUtil.generateToken(jwtUser, new Device() {
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
            }));
                        return jwtUser;
                    }
        else
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        return null;
        }
}
