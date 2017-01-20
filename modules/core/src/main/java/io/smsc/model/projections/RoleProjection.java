package io.smsc.model.projections;

import io.smsc.model.Permission;
import io.smsc.model.Role;
import io.smsc.model.User;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

/**
 * This interface is describing excerpting projection for {@link Role}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author  Nazar Lipkovskyy
 * @see     Projection
 * @since   0.0.1-SNAPSHOT
 */
@Projection(name = "role", types = { Role.class })
public interface RoleProjection {

    Long getId();

    String getName();

    Set<Permission> getPermissions();

//    Set<User> getUsers();
}
