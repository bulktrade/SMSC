package io.smsc.model.acl;

import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

/**
 * Stores the name of the users which can be a principal (like usernames john, james, mark)
 * or an authority (like roles ROLE_ADMIN, ROLE USER, ROLE_ANYONE).
 *
 * @author  Nazar Lipkovskyy
 * @see     BaseEntity
 * @since   0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "ACL_SID", uniqueConstraints = {@UniqueConstraint(columnNames = {"SID", "PRINCIPAL"}, name = "acl_sid_sid_principal_idx")})
public class AclSid extends BaseEntity {

    /**
     * A flag to indicate if the sid field is a username or a role.
     */
    @Column(name = "PRINCIPAL", nullable = false, unique = true)
    @NotNull(message = "{acl.sid.principal.validation}")
    private Boolean principal;

    /**
     * The actual username (ie. john) or role (ie. ROLE_ADMIN).
     */
    @Column(name = "SID", nullable = false, unique = true)
    @NotEmpty(message = "{acl.sid.sid.validation}")
    private String sid;

    @OneToMany(mappedBy = "sid")
    @OrderBy
    private Set<AclEntry> aclEntrySet;

    @OneToMany(mappedBy = "ownerSid")
    @OrderBy
    private Set<AclObjectIdentity> aclObjectIdentities;

    public AclSid() {
    }

    public AclSid(Long id, Boolean principal, String sid) {
        super(id);
        this.principal = principal;
        this.sid = sid;
    }

    public Boolean getPrincipal() {
        return principal;
    }

    public void setPrincipal(Boolean principal) {
        this.principal = principal;
    }

    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public Set<AclEntry> getAclEntrySet() {
        return aclEntrySet;
    }

    public void setAclEntrySet(Set<AclEntry> aclEntrySet) {
        this.aclEntrySet = aclEntrySet;
    }

    public Set<AclObjectIdentity> getAclObjectIdentities() {
        return aclObjectIdentities;
    }

    public void setAclObjectIdentities(Set<AclObjectIdentity> aclObjectIdentities) {
        this.aclObjectIdentities = aclObjectIdentities;
    }

    @Override
    public String toString() {
        return "AclSid{" +
                "principal=" + principal +
                ", sid='" + sid + '\'' +
                "} " + super.toString();
    }
}
