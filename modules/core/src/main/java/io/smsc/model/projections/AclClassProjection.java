package io.smsc.model.projections;

import io.smsc.model.acl.AclClass;
import io.smsc.model.acl.AclObjectIdentity;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

/**
 * This interface is describing excerpting projection for {@link AclClass}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author Nazar Lipkovskyy
 * @see Projection
 * @since 0.0.1-SNAPSHOT
 */
@Projection(name = "withObjectIdentities", types = {AclClass.class})
public interface AclClassProjection {

    Long getId();

    String getClassName();

    Set<AclObjectIdentity> getAclObjectIdentities();
}
