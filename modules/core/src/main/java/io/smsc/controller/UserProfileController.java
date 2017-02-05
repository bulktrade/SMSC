package io.smsc.controller;

import io.smsc.model.User;
import io.smsc.repository.UserRepository;
import io.smsc.security.model.*;
import io.smsc.security.service.JWTTokenGenerationService;
import io.smsc.security.service.JWTUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class UserProfileController {
    @Autowired
    UserRepository userRepository;

    @PreAuthorize("isFullyAuthenticated()")
    @RequestMapping(method = GET, value = "/rest/profile")
    public @ResponseBody User getLoggedUser() {
        JWTUser jwtUser = (JWTUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findOne(jwtUser.getId());
    }
}
