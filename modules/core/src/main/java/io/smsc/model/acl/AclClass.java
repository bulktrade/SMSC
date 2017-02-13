package io.smsc.model.acl;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.util.Set;

/**
 * Stores the fully qualified name of domain objects. It is made up of the package
 * name and class name of the object.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @since 0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "ACL_CLASS", uniqueConstraints = {@UniqueConstraint(columnNames = "CLASS", name = "acl_class_idx")})
public class AclClass extends BaseEntity {

    @Id
    @SequenceGenerator(name = "acl_class_seq", sequenceName = "acl_class_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "acl_class_seq")
    @Column(name = "ID")
    // PROPERTY access for id due to bug: https://hibernate.atlassian.net/browse/HHH-3718
    @Access(value = AccessType.PROPERTY)
    private Long id;

    /**
     * The fully qualified name of the domain object.
     */
    @Column(name = "CLASS", nullable = false, unique = true)
    @NotEmpty(message = "{acl.class.className.validation}")
    private String className;

    @OneToMany(mappedBy = "objectIdClass")
    @OrderBy
    private Set<AclObjectIdentity> aclObjectIdentities;

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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AclClass aclClass = (AclClass) o;

        if (!getId().equals(aclClass.getId())) return false;
        return getClassName().equals(aclClass.getClassName());
    }

    @Override
    public int hashCode() {
        int result = getId().hashCode();
        result = 31 * result + getClassName().hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "AclClass{" +
                "id=" + id +
                ", className='" + className + '\'' +
                ", aclObjectIdentities=" + aclObjectIdentities +
                "} " + super.toString();
    }
}
