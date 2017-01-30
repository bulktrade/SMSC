package io.smsc.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Pattern;
import java.util.Set;

/**
 * Specifies Role class as an entity class.
 *
 * @author  Nazar Lipkovskyy
 * @see     BaseEntity
 * @since   0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "ROLE", uniqueConstraints = {@UniqueConstraint(columnNames = "NAME", name = "roles_unique_name_idx")})
public class Role extends BaseEntity{

    @Column(name = "NAME", nullable = false, unique = true)
    @NotEmpty(message = "{role.empty.validation}")
    @Pattern(regexp = "[A-Z_]+", message = "{role.name.validation}")
    private String name;

    @ManyToMany(mappedBy = "roles")
    @OrderBy
    @JsonBackReference()
    private Set<User> users;

    /**
     * This method is used for removing all links on Role entity from
     * appropriate User entities before entity is removed. Without
     * it deleting entity can cause <code>ConstraintViolationException<code/>
     */
    @PreRemove
    private void removeRolesFromUsers() {
        for (User user : users) {
            user.getRoles().remove(this);
        }
    }

    public Role() {
    }

    public Role(Role role) {
        this(role.getId(), role.getName());
    }

    public Role(Long id, String name) {
        super(id);
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
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
                '}';
    }
}
