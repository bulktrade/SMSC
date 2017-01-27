package io.smsc.model.projections;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.smsc.model.Role;

import org.springframework.data.rest.core.config.Projection;

import java.util.Date;


/**
 * This interface is describing excerpting projection for {@link Role}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author  Nazar Lipkovskyy
 * @see     Projection
 * @since   0.0.1-SNAPSHOT
 */
@Projection(name = "withPermissions", types = { Role.class })
public interface RoleProjection {

    Long getId();

    Long getVersion();

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="UTC")
    Date getLastModifiedDate();

    String getName();

//    Set<User> getUsers();
}
