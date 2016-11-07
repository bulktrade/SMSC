package io.smsc.model;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Pattern;
import java.util.List;

@Entity
@Table(name = "ROLES", uniqueConstraints = {@UniqueConstraint(columnNames = "name", name = "roles_unique_name_idx")})
public class Role{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    @NotEmpty(message = "Role name cannot be empty")
    @Pattern(regexp = "[A-Z_]+", message = "Role's name can be only uppercase and contain '_' symbol")
    private String name;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade =
                    {
                            CascadeType.DETACH,
                            CascadeType.MERGE,
                            CascadeType.REFRESH,
                            CascadeType.PERSIST
                    },
            targetEntity = Permission.class)
    @JoinTable(
            name = "roles_permissions",
            joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id", referencedColumnName = "id"),
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )
    private List<Permission> permissions;

    @ManyToMany(mappedBy = "roles")
    private List<User> users;

    @PreRemove
    private void removeRolesFromUsers() {
        for (User user : users) {
            user.getRoles().remove(this);
        }
    }

    public Role() {
    }

    public Role(Long id, String name) {
        this.id = id;
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

    public boolean isNew() {
        return this.id == null;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Role role = (Role) o;

        if (!id.equals(role.id)) return false;
        return name.equals(role.name);

    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + name.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
