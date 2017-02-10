package io.smsc.model.projections;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.smsc.model.CustomerUser;
import io.smsc.model.User;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.CustomerContact;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;
import java.util.Set;

/**
 * This interface is describing excerpting projection for {@link Customer}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author Nazar Lipkovskyy
 * @see Projection
 * @since 0.0.1-SNAPSHOT
 */
@Projection(name = "withContactsAndUsers", types = {Customer.class})
public interface CustomerProjection {

    Long getId();

    Long getVersion();

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    Date getLastModifiedDate();

    String getCompanyName();

    String getStreet();

    String getStreet2();

    String getPostcode();

    String getCountry();

    String getCity();

    Double getVatid();

    Customer getParent();

    Set<CustomerContact> getContacts();

    Set<CustomerUser> getCustomerUsers();
}
