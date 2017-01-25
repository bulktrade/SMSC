package io.smsc.model.acl;

import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.util.Set;

/**
 * Stores the fully qualified name of domain objects. It is made up of the package
 * name and class name of the object.
 *
 * @author  Nazar Lipkovskyy
 * @see     BaseEntity
 * @since   0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "ACL_CLASS", uniqueConstraints = {@UniqueConstraint(columnNames = "CLASS", name = "acl_class_unique_class_idx")})
public class AclClass extends BaseEntity {

    /**
     * The fully qualified name of the domain object.
     */
    @Column(name = "CLASS", nullable = false, unique = true)
    @NotEmpty(message = "{acl.class.className.validation}")
    private String className;

    @OneToMany(mappedBy = "objectIdClass")
    @OrderBy
    private Set<AclObjectIdentity> aclObjectIdentities;

    public AclClass() {
    }

    public AclClass(Long id, String className) {
        super(id);
        this.className = className;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public Set<AclObjectIdentity> getAclObjectIdentities() {
        return aclObjectIdentities;
    }

    public void setAclObjectIdentities(Set<AclObjectIdentity> aclObjectIdentities) {
        this.aclObjectIdentities = aclObjectIdentities;
    }

    @Override
    public String toString() {
        return "AclClass{" +
                "className='" + className + '\'' +
                "} " + super.toString();
    }
}
