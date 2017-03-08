package io.smsc.model.admin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Pattern;
import java.util.Objects;
import java.util.Set;

/**
 * Specifies Role class as an entity class.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @since 0.0.1-SNAPSHOT
 */
@Entity()
@Table(name = "ADMIN_USER_ROLE", uniqueConstraints = {@UniqueConstraint(columnNames = "NAME", name = "roles_unique_name_idx")})
public class Role extends BaseEntity {

    @Id
    @SequenceGenerator(name = "role_seq", sequenceName = "role_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "role_seq")
    @Column(name = "ID")
    // PROPERTY access for id due to bug: https://hibernate.atlassian.net/browse/HHH-3718
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Column(name = "NAME", nullable = false, unique = true)
    @NotEmpty(message = "{role.empty.validation}")
    @Pattern(regexp = "[R][O][L][E][_][A-Z_]+", message = "{role.name.validation}")
    private String name;

    @ManyToMany(cascade =
            {
                    CascadeType.DETACH,
                    CascadeType.MERGE,
                    CascadeType.REFRESH,
                    CascadeType.PERSIST
            },
            targetEntity = User.class)
    @JoinTable(
            name = "ADMIN_USER_ROLE_USER",
            joinColumns = @JoinColumn(name = "ROLE_ID", referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "ID")
    )
    @OrderBy("id asc")
    private Set<User> users;

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

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Role role = (Role) o;

        if (!getId().equals(role.getId())) return false;
        return getName().equals(role.getName());
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(getId());
        result = 31 * result + Objects.hashCode(getName());
        return result;
    }

    @Override
    public String toString() {
        return "{ id=" + id +
                ", name='" + name + '\'' +
                ", version='" + version + '\'' +
                ", lastModifiedDate='" + lastModifiedDate + '\'' +
                "}";
    }
}
