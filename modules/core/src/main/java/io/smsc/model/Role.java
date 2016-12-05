package io.smsc.model;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Pattern;
import java.util.List;

@Entity
@Table(name = "ROLE", uniqueConstraints = {@UniqueConstraint(columnNames = "NAME", name = "roles_unique_name_idx")})
public class Role extends BaseEntity{

    @Column(name = "NAME", nullable = false, unique = true)
    @NotEmpty(message = "{role.empty.validation}")
    @Pattern(regexp = "[A-Z_]+", message = "{role.name.validation}")
    private String name;

    @ManyToMany(fetch = FetchType.LAZY)
    @OrderBy
    @JoinTable(
            name = "ROLE_PERMISSION",
            joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id", referencedColumnName = "id")
    )
    private List<Permission> permissions;

    @ManyToMany(mappedBy = "roles")
    @OrderBy
    private List<User> users;

    @PreRemove
    private void removeRolesFromUsers() {
        for (User user : users) {
            user.getRoles().remove(this);
        }
    }

    public Role() {
    }

    public Role(Role role) {
        this(role.getId(),role.getName());
    }

    public Role(Long id, String name) {
        super(id);
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Permission> permissions) {
        this.permissions = permissions;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public boolean addPermission(Permission permission){
        return this.permissions.add(permission);
    }

    public boolean removePermission(Permission permission){
        return this.permissions.remove(permission);
    }

    public boolean addUser(User user){
        return this.users.add(user);
    }

    public boolean removeUser(User user){
        return this.users.remove(user);
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", permissions=" + permissions +
                '}';
    }
}
