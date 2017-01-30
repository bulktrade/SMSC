package io.smsc.model.acl;

import io.smsc.model.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Stores the actual permissions assigned for each user and domain object.
 *
 * @author  Nazar Lipkovskyy
 * @see     BaseEntity
 * @since   0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "ACL_ENTRY", uniqueConstraints = {@UniqueConstraint(columnNames = {"ACL_OBJECT_IDENTITY", "ACE_ORDER"}, name = "acl_entry_object_identity_order_idx")})
public class AclEntry extends BaseEntity {

    /**
     * Refers to the ordering of the access control entries.
     */
    @Column(name = "ACE_ORDER", nullable = false, unique = true)
    @NotNull(message = "{acl.entry.order.validation}")
    private Integer aceOrder;

    /**
     * A bitwise mask to indicate the permissions. A value of 1 is equivalent to READ permission,
     * 2 for WRITE, and so forth.
     */
    @Column(name = "MASK", nullable = false)
    @NotNull(message = "{acl.entry.mask.validation}")
    private Integer mask;

    /**
     * A flag to indicate whether the mask should be interpreted as granting access or deny access.
     */
    @Column(name = "GRANTING", nullable = false)
    @NotNull(message = "{acl.entry.granting.validation}")
    private Boolean granting;

    /**
     * 	A flag to indicate whether to audit a successful permission.
     */
    @Column(name = "AUDIT_SUCCESS", nullable = false)
    @NotNull(message = "{acl.entry.audit.success.validation}")
    private Boolean auditSuccess;

    /**
     * A flag to indicate whether to audit a failed permission.
     */
    @Column(name = "AUDIT_FAILURE", nullable = false)
    @NotNull(message = "{acl.entry.audit.failure.validation}")
    private Boolean auditFailure;

    /**
     * Refers to the id field in the acl_object_identity table.
     */
    @ManyToOne
    @JoinColumn(name = "ACL_OBJECT_IDENTITY", nullable = false, unique = true)
    @NotNull(message = "{acl.entry.object.identity.validation}")
    private AclObjectIdentity aclObjectIdentity;

    /**
     * Refers to the id field in the acl_sid table.
     */
    @ManyToOne
    @JoinColumn(name = "SID", nullable = false)
    @NotNull(message = "{acl.entry.sid.validation}")
    private AclSid sid;

    public AclEntry() {
    }

    public AclEntry(Long id, AclObjectIdentity aclObjectIdentity, Integer aceOrder, AclSid sid, Integer mask, Boolean granting, Boolean auditSuccess, Boolean auditFailure) {
        super(id);
        this.aclObjectIdentity = aclObjectIdentity;
        this.aceOrder = aceOrder;
        this.sid = sid;
        this.mask = mask;
        this.granting = granting;
        this.auditSuccess = auditSuccess;
        this.auditFailure = auditFailure;
    }

    public AclObjectIdentity getAclObjectIdentity() {
        return aclObjectIdentity;
    }

    public void setAclObjectIdentity(AclObjectIdentity aclObjectIdentity) {
        this.aclObjectIdentity = aclObjectIdentity;
    }

    public Integer getAclOrder() {
        return aceOrder;
    }

    public void setAclOrder(Integer aclOrder) {
        this.aceOrder = aclOrder;
    }

    public AclSid getSid() {
        return sid;
    }

    public void setSid(AclSid sid) {
        this.sid = sid;
    }

    public Integer getMask() {
        return mask;
    }

    public void setMask(Integer mask) {
        this.mask = mask;
    }

    public Boolean getGranting() {
        return granting;
    }

    public void setGranting(Boolean granting) {
        this.granting = granting;
    }

    public Boolean getAuditSuccess() {
        return auditSuccess;
    }

    public void setAuditSuccess(Boolean auditSuccess) {
        this.auditSuccess = auditSuccess;
    }

    public Boolean getAuditFailure() {
        return auditFailure;
    }

    public void setAuditFailure(Boolean auditFailure) {
        this.auditFailure = auditFailure;
    }

    @Override
    public String toString() {
        return "AclEntry{" +
                "aclObjectIdentity=" + aclObjectIdentity +
                ", aceOrder=" + aceOrder +
                ", mask=" + mask +
                ", granting=" + granting +
                ", auditSuccess=" + auditSuccess +
                ", auditFailure=" + auditFailure +
                "} " + super.toString();
    }
}
