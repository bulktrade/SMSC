package io.smsc.model;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.util.List;

@Entity
@Table(name = "PERMISSIONS", uniqueConstraints = {@UniqueConstraint(columnNames = "name", name = "permissions_unique_name_idx")})
public class Permission{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    @NotEmpty(message = "Permission name cannot be empty")
    @Pattern(regexp = "[A-Z_]+", message = "Permission's name can be only uppercase and contain '_' symbol")
    private String name;

    @ManyToMany(mappedBy = "permissions")
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
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public boolean isNew() {
        return this.id == null;
    }

    public boolean addRole(Role role){
        return this.roles.add(role);
    }

    public boolean removeRole(Role role){
        return this.roles.remove(role);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Permission that = (Permission) o;

        if (!id.equals(that.id)) return false;
        return name.equals(that.name);
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + name.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "Permission{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
