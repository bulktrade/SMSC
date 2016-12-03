package io.smsc.model;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.util.List;

@Entity
@Table(name = "PERMISSION", uniqueConstraints = {@UniqueConstraint(columnNames = "NAME", name = "permissions_unique_name_idx")})
public class Permission extends BaseEntity{

    @Column(name = "NAME", nullable = false, unique = true)
    @NotEmpty(message = "{permission.empty.validation}")
    @Pattern(regexp = "[A-Z_]+", message = "{permission.name.validation}")
    private String name;

    @ManyToMany(mappedBy = "permissions")
    @OrderBy
    private List<Role> roles;

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

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
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
