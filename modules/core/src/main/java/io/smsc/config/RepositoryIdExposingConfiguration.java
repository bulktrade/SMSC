package io.smsc.config;

import io.smsc.model.Permission;
import io.smsc.model.Role;
import io.smsc.model.User;
import io.smsc.model.crud.CrudClassMetaData;
import io.smsc.model.crud.CrudMetaFormData;
import io.smsc.model.crud.CrudMetaGridData;
import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.CustomerContact;
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
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@Configuration
public class RepositoryIdExposingConfiguration extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(User.class);
        config.exposeIdsFor(Role.class);
        config.exposeIdsFor(Permission.class);
        config.exposeIdsFor(Customer.class);
        config.exposeIdsFor(CustomerContact.class);
        config.exposeIdsFor(Dashboard.class);
        config.exposeIdsFor(DashboardBox.class);
        config.exposeIdsFor(DashboardBoxType.class);
        config.exposeIdsFor(CrudClassMetaData.class);
        config.exposeIdsFor(CrudMetaFormData.class);
        config.exposeIdsFor(CrudMetaGridData.class);
        config.exposeIdsFor(MetaDataPropertyBindingParameter.class);
    }
}
