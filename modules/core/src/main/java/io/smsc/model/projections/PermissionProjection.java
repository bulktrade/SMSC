package io.smsc.model.projections;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.smsc.model.Permission;
import io.smsc.model.Role;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;
import java.util.Set;

/**
 * This interface is describing excerpting projection for {@link Permission}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author  Nazar Lipkovskyy
 * @see     Projection
 * @since   0.0.1-SNAPSHOT
 */
@Projection(name = "permissions", types = { Permission.class })
public interface PermissionProjection {

    Long getId();

    Long getVersion();

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="GMT")
    Date getLastModifiedDate();

    String getName();

//    Set<Role> getRoles();
}
