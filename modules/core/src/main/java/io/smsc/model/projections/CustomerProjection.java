package io.smsc.model.projections;

import io.smsc.model.User;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.CustomerContact;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

/**
 * This interface is describing excerpting projection for {@link Customer}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author  Nazar Lipkovskyy
 * @see     Projection
 * @since   0.0.1-SNAPSHOT
 */
@Projection(name = "customer", types = { Customer.class })
public interface CustomerProjection {

    Long getId();

    Double getCustomerId();

    String getCompanyName();

    String getStreet();

    String getStreet2();

    String getPostcode();

    String getCountry();

    String getCity();

    Double getVatid();

    Customer getParentCustomer();

    Set<CustomerContact> getContacts();

    Set<User> getUsers();

}
