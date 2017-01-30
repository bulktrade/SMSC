package io.smsc.model.projections;

import io.smsc.model.acl.AclClass;
import io.smsc.model.acl.AclEntry;
import io.smsc.model.acl.AclObjectIdentity;
import io.smsc.model.acl.AclSid;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

/**
 * This interface is describing excerpting projection for {@link AclObjectIdentity}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author  Nazar Lipkovskyy
 * @see     Projection
 * @since   0.0.1-SNAPSHOT
 */
@Projection(name = "withObjectIdClassAndParentObjectAndOwnerSid", types = {AclObjectIdentity.class })
public interface AclObjectIdentityProjection {

    Long getId();

    AclClass getObjectIdClass();

    Long getObjectIdIdentity();

    AclObjectIdentity getParentObject();

    AclSid getOwnerSid();

    Boolean getEntriesInheriting();

    Set<AclEntry> getAclEntries();
}
