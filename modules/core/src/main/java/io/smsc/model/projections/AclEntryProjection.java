package io.smsc.model.projections;

import io.smsc.model.acl.AclEntry;
import io.smsc.model.acl.AclObjectIdentity;
import io.smsc.model.acl.AclSid;
import org.springframework.data.rest.core.config.Projection;

/**
 * This interface is describing excerpting projection for {@link AclEntry}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author Nazar Lipkovskyy
 * @see Projection
 * @since 0.0.1-SNAPSHOT
 */
@Projection(name = "withObjectIdentityAndSid", types = {AclEntry.class})
public interface AclEntryProjection {

    Long getId();

    AclObjectIdentity getAclObjectIdentity();

    Integer getAclOrder();

    AclSid getSid();

    Integer getMask();

    Boolean getGranting();

    Boolean getAuditSuccess();

    Boolean getAuditFailure();
}
