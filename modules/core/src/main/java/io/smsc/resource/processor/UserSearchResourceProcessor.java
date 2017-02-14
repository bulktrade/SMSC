package io.smsc.resource.processor;

import io.smsc.model.user.User;
import io.smsc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositorySearchesResource;
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.stereotype.Component;

@Component
public class UserSearchResourceProcessor implements ResourceProcessor<RepositorySearchesResource> {
    @Autowired
    private
    RepositoryEntityLinks entityLinks;

    @Override
    public RepositorySearchesResource process(RepositorySearchesResource resource) {
        if (resource.getDomainType() == User.class) { // @todo could not find any better solution
            resource.add(entityLinks.linkFor(UserRepository.class).slash("search").slash("me").withRel("me"));
        }

        return resource;
    }
}
