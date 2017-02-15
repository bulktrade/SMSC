package io.smsc.model.acl;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.smsc.model.BaseEntity;
import io.smsc.model.admin.Group;
import io.smsc.model.admin.User;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

/**
 * Stores the name of the users which can be a principal (like usernames john, james, mark)
 * or an authority (like roles ROLE_ADMIN, ROLE USER, ROLE_ANYONE).
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @since 0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "ACL_SID", uniqueConstraints = {@UniqueConstraint(columnNames = {"SID", "PRINCIPAL"}, name = "acl_sid_principal_idx")})
public class AclSid extends BaseEntity {

    @Id
    @SequenceGenerator(name = "acl_sid_seq", sequenceName = "acl_sid_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "acl_sid_seq")
    @Column(name = "ID")
    // PROPERTY access for id due to bug: https://hibernate.atlassian.net/browse/HHH-3718
    @Access(value = AccessType.PROPERTY)
    private Long id;

    /**
     * A flag to indicate if the sid field is a username or a role.
     */
    @Column(name = "PRINCIPAL", nullable = false)
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
    private Set<AclEntry> aclEntries;

    @OneToMany(mappedBy = "ownerSid")
    @OrderBy
    private Set<AclObjectIdentity> aclObjectIdentities;

    @OneToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToOne
    @JoinColumn(name = "GROUP_ID")
    private Group group;

    @JsonIgnore
    public boolean isNew() {
        return getId() == null;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<AclEntry> getAclEntries() {
        return aclEntries;
    }

    public void setAclEntries(Set<AclEntry> aclEntries) {
        this.aclEntries = aclEntries;
    }

    public Set<AclObjectIdentity> getAclObjectIdentities() {
        return aclObjectIdentities;
    }

    public void setAclObjectIdentities(Set<AclObjectIdentity> aclObjectIdentities) {
        this.aclObjectIdentities = aclObjectIdentities;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AclSid aclSid = (AclSid) o;

        if (!getId().equals(aclSid.getId())) return false;
        if (!getPrincipal().equals(aclSid.getPrincipal())) return false;
        return getSid().equals(aclSid.getSid());
    }

    @Override
    public int hashCode() {
        int result = getId().hashCode();
        result = 31 * result + getPrincipal().hashCode();
        result = 31 * result + getSid().hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "AclSid{" +
                "id=" + id +
                ", principal=" + principal +
                ", sid='" + sid + '\'' +
                "} " + super.toString();
    }
}
