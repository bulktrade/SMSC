package io.smsc.config;

import io.smsc.model.mcc.Mcc;
import io.smsc.model.admin.Authority;
import io.smsc.model.admin.Group;
import io.smsc.model.admin.Role;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.Contact;
import io.smsc.model.customer.User;
import io.smsc.model.dashboard.Dashboard;
import io.smsc.model.dashboard.DashboardBox;
import io.smsc.model.dashboard.DashboardBoxType;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

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
        config.exposeIdsFor(io.smsc.model.admin.User.class, User.class, Role.class, Authority.class, Group.class, Customer.class, Contact.class,
                Dashboard.class, DashboardBox.class, DashboardBoxType.class, Mcc.class);
    }
}
