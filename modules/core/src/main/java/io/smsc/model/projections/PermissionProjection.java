package io.smsc.model.projections;

import io.smsc.model.Permission;
import io.smsc.model.Role;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

/**
 * This interface is describing excerpting projection for {@link Permission}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author  Nazar Lipkovskyy
 * @see     Projection
 * @since   0.0.1-SNAPSHOT
 */
@Projection(name = "permission", types = { Permission.class })
public interface PermissionProjection {

    Long getId();

    String getName();

    Set<Role> getRoles();
}
