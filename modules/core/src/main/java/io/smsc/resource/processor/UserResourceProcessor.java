package io.smsc.resource.processor;

import io.smsc.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.mapping.LinkCollector;
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Links;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.stereotype.Component;

@Component
public class UserResourceProcessor implements ResourceProcessor<Resource<User>> {
    @Autowired
    private
    LinkCollector collector;

    @Autowired
    private
    RepositoryEntityLinks entityLinks;

    @Override
    public Resource<User> process(Resource<User> resource) {
        Object source = resource.getContent();
        Links links = collector.getLinksFor(source, resource.getLinks());

        if (!links.isEmpty() && resource.getLinks().size() == 0) {
            for (Link link : links) {
                if (link.getRel().equals(Link.REL_SELF)) {
                    resource.add(entityLinks.linkForSingleResource(resource.getContent().getClass(), resource.getContent().getId()).withSelfRel());
                } else {
                    resource.add(link);
                }
            }

            resource.add(entityLinks.linkToSingleResource(resource.getContent().getClass(), resource.getContent().getId()));
        }

        return resource;
    }
}
