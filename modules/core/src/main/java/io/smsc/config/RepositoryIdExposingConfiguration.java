package io.smsc.config;

import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.type.filter.AnnotationTypeFilter;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * The RepositoryIdExposingConfiguration class is used for providing ID value exposing
 * as a normal property for all entity classes.
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@Configuration
public class RepositoryIdExposingConfiguration extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        ClassPathScanningCandidateComponentProvider provider = new ClassPathScanningCandidateComponentProvider(true);
        provider.addIncludeFilter(new AnnotationTypeFilter(Entity.class));
        Set<BeanDefinition> components = provider.findCandidateComponents(this.getClass().getPackage().getName());
        List<Class<?>> classes = new ArrayList<>();

        components.forEach(component -> {
            try {
                classes.add(Class.forName(component.getBeanClassName()));
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        config.exposeIdsFor(classes.toArray(new Class[classes.size()]));
    }
}
