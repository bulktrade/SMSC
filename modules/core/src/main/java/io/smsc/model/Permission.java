package io.smsc.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.util.Set;

/**
 * Specifies Permission class as an entity class.
 *
 * @author  Nazar Lipkovskyy
 * @see     BaseEntity
 * @since   0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "PERMISSION", uniqueConstraints = {@UniqueConstraint(columnNames = "NAME", name = "permissions_unique_name_idx")})
public class Permission extends BaseEntity{

    @Column(name = "NAME", nullable = false, unique = true)
    @NotEmpty(message = "{permission.empty.validation}")
    @Pattern(regexp = "[A-Z_]+", message = "{permission.name.validation}")
    private String name;

    @ManyToMany(mappedBy = "permissions")
    @OrderBy
    @JsonBackReference
    private Set<Role> roles;

    /**
     * This method is used for removing all links on Permission entity from
     * appropriate Role entities before entity is removed. Without
     * it deleting entity can cause <code>ConstraintViolationException<code/>
     */
    @PreRemove
    private void removePermissionsFromRoles() {
        for (Role role : roles) {
            role.getPermissions().remove(this);
        }
    }

    public Permission() {
    }

    public Permission(Permission permission){
        this(permission.getId(),permission.getName());
    }

    public Permission(Long id, String name) {
        super(id);
        this.name = name;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean addRole(Role role){
        return this.roles.add(role);
    }

    public boolean removeRole(Role role){
        return this.roles.remove(role);
    }

    @Override
    public String toString() {
        return "Permission{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
