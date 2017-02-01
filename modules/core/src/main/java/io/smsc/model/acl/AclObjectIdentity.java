package io.smsc.model.acl;

import io.smsc.model.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

/**
 * Stores the actual identities of the domain objects. The identities are referenced via a
 * unique id which is retrieved from other model tables.
 *
 * @author  Nazar Lipkovskyy
 * @see     BaseEntity
 * @since   0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "ACL_OBJECT_IDENTITY", uniqueConstraints = {@UniqueConstraint(columnNames = {"OBJECT_ID_CLASS", "OBJECT_ID_IDENTITY"}, name = "acl_class_identity_idx")})
public class AclObjectIdentity extends BaseEntity {

    /**
     * Refers to the primary id of the domain object. The id is assigned from another model tables.
     * Every domain object in the application needs to have a unique id.
     */
    @Column(name = "OBJECT_ID_IDENTITY", nullable = false, unique = true)
    @NotNull(message = "{acl.object.id.identity.validation}")
    private Long objectIdIdentity;

    /**
     * Refers to the id of the parent object if existing.
     */
    @ManyToOne
    @JoinColumn(name="PARENT_OBJECT")
    private AclObjectIdentity parentObject;

    /**
     * Refers to the id field in the acl_sid. This is a reference to the username or role.
     */
    @ManyToOne
    @JoinColumn(name = "OWNER_SID", nullable = false)
    @NotNull(message = "{acl.object.id.owner.sid.validation}")
    private AclSid ownerSid;

    /**
     * 	Refers to the id field in the acl_class. This is a reference to the fully qualified
     * 	name of the class.
     */
    @ManyToOne
    @JoinColumn(name = "OBJECT_ID_CLASS", nullable = false, unique = true)
    @NotNull(message = "{acl.object.id.class.validation}")
    private AclClass objectIdClass;

    /**
     * A flag to indicate whether the object has inherited entries.
     */
    @Column(name = "ENTRIES_INHERITING", nullable = false)
    @NotNull(message = "{acl.object.entries.inheriting.validation}")
    private Boolean entriesInheriting;

    @OneToMany(mappedBy = "aclObjectIdentity")
    @OrderBy
    private Set<AclEntry> aclEntries;

    public AclObjectIdentity() {
    }

    public AclObjectIdentity(Long id, AclClass objectIdClass, Long objectIdIdentity, AclObjectIdentity parentObject, AclSid ownerSid, Boolean entriesInheriting) {
        super(id);
        this.objectIdClass = objectIdClass;
        this.objectIdIdentity = objectIdIdentity;
        this.parentObject = parentObject;
        this.ownerSid = ownerSid;
        this.entriesInheriting = entriesInheriting;
    }

    public AclClass getObjectIdClass() {
        return objectIdClass;
    }

    public void setObjectIdClass(AclClass objectIdClass) {
        this.objectIdClass = objectIdClass;
    }

    public Long getObjectIdIdentity() {
        return objectIdIdentity;
    }

    public void setObjectIdIdentity(Long objectIdIdentity) {
        this.objectIdIdentity = objectIdIdentity;
    }

    public AclObjectIdentity getParentObject() {
        return parentObject;
    }

    public void setParentObject(AclObjectIdentity parentObject) {
        this.parentObject = parentObject;
    }

    public AclSid getOwnerSid() {
        return ownerSid;
    }

    public void setOwnerSid(AclSid ownerSid) {
        this.ownerSid = ownerSid;
    }

    public Boolean getEntriesInheriting() {
        return entriesInheriting;
    }

    public void setEntriesInheriting(Boolean entriesInheriting) {
        this.entriesInheriting = entriesInheriting;
    }

    public Set<AclEntry> getAclEntries() {
        return aclEntries;
    }

    public void setAclEntries(Set<AclEntry> aclEntries) {
        this.aclEntries = aclEntries;
    }

    @Override
    public String toString() {
        return "AclObjectIdentity{" +
                "objectIdClass=" + objectIdClass +
                ", objectIdIdentity=" + objectIdIdentity +
                ", entriesInheriting=" + entriesInheriting +
                "} " + super.toString();
    }
}
