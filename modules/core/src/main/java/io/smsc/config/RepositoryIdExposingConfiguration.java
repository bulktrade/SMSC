package io.smsc.config;

import io.smsc.model.CustomerUser;
import io.smsc.model.Role;
import io.smsc.model.User;
import io.smsc.model.acl.AclClass;
import io.smsc.model.acl.AclEntry;
import io.smsc.model.acl.AclObjectIdentity;
import io.smsc.model.acl.AclSid;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.CustomerContact;
import io.smsc.model.dashboard.Dashboard;
import io.smsc.model.dashboard.DashboardBox;
import io.smsc.model.dashboard.DashboardBoxType;
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
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@Configuration
public class RepositoryIdExposingConfiguration extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

        // for this time only one solution which works completely
        config.exposeIdsFor(User.class, CustomerUser.class, Role.class, Customer.class, CustomerContact.class, Dashboard.class,
                DashboardBox.class, DashboardBoxType.class, AclClass.class, AclEntry.class, AclObjectIdentity.class, AclSid.class);
    }
}
