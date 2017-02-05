package io.smsc.controller;

import io.smsc.model.User;
import io.smsc.repository.UserRepository;
import io.smsc.security.model.JWTUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RepositoryRestController
public class UserProfileController {
    @Autowired
    UserRepository repository;

    @Autowired
    public UserProfileController(UserRepository repo) {
        repository = repo;
    }

    @PreAuthorize("isFullyAuthenticated()")
    @RequestMapping(method = GET, value = "/users/search/me")
    public
    @ResponseBody
    Resource<User> getLoggedUser() {
        JWTUser jwtUser = (JWTUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return new Resource<>(repository.findOne(jwtUser.getId()));
    }
}
