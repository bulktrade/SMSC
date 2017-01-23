package io.smsc.model.projections;

import io.smsc.model.customer.CustomerContact;
import io.smsc.model.customer.Salutation;
import io.smsc.model.customer.Type;
import org.springframework.data.rest.core.config.Projection;

/**
 * This interface is describing excerpting projection for {@link CustomerContact}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author  Nazar Lipkovskyy
 * @see     Projection
 * @since   0.0.1-SNAPSHOT
 */
@Projection(name = "customerContact", types = { CustomerContact.class })
public interface CustomerContactProjection {

    Long getId();

    String getFirstname();

    String getSurname();

    String getPhone();

    String getMobilePhone();

    String getFax();

    String getEmailAddress();

//    Customer getCustomer();

    Type getType();

    Salutation getSalutation();
}
