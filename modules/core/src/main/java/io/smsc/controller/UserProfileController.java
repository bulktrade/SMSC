package io.smsc.controller;

import io.smsc.model.User;
import io.smsc.repository.UserRepository;
import io.smsc.security.model.JWTUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import static org.springframework.hateoas.TemplateVariable.VariableType.REQUEST_PARAM;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RepositoryRestController
public class UserProfileController {
    @Autowired
    UserRepository repository;

    @Autowired
    RepositoryEntityLinks entityLinks;

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
        Resource<User> result = new Resource<>(repository.findOne(jwtUser.getId()));

        Link userLink = entityLinks.linkToSingleResource(UserRepository.class, jwtUser.getId());
        TemplateVariables templateVariables = new TemplateVariables(new TemplateVariable("projection", REQUEST_PARAM));

        result.add(userLink.withSelfRel());
        result.add(new Link((new UriTemplate(userLink.getHref(), templateVariables).toString()), "user"));
        result.add(new Link((new UriTemplate(userLink.getHref().concat("/roles"))).toString(), "roles")); // @todo update after roles entitiy change to authorities.
        result.add(new Link((new UriTemplate(userLink.getHref().concat("/dashboards"))).toString(), "dashboards"));

        return result;
    }
}
