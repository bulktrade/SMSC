package io.smsc.model.projections;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.smsc.model.CustomerUser;
import io.smsc.model.Role;
import io.smsc.model.User;
import io.smsc.model.customer.Customer;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;
import java.util.Set;

/**
 * This interface is describing excerpting projection for {@link User}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author  Nazar Lipkovskyy
 * @see     Projection
 * @since   0.0.1-SNAPSHOT
 */
@Projection(name = "withRoles", types = { CustomerUser.class })
public interface CustomerUserProjection {

    Long getId();

    Long getVersion();

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="UTC")
    Date getLastModifiedDate();

    String getUsername();

    String getFirstname();

    String getSurname();

    String getEmail();

    boolean isActive();

    Date getCreated();

    boolean isBlocked();

    String getSalt();

    Customer getCustomer();
}
