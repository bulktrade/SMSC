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
 * Specifies Authority class as an entity class.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @since 0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "ADMIN_USER_AUTHORITY", uniqueConstraints = {@UniqueConstraint(columnNames = "NAME", name = "authority_unique_name_idx")})
public class Authority extends BaseEntity {

    @Id
    @SequenceGenerator(name = "authority_seq", sequenceName = "authority_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "authority_seq")
    @Column(name = "ID")
    // PROPERTY access for id due to bug: https://hibernate.atlassian.net/browse/HHH-3718
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Column(name = "NAME", nullable = false, unique = true)
    @NotEmpty(message = "{authority.empty.validation}")
    @Pattern(regexp = "[A-Z_]+", message = "{authority.name.validation}")
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
            name = "ADMIN_USER_AUTHORITY_USER",
            joinColumns = @JoinColumn(name = "AUTHORITY_ID", referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "ID")
    )
    @OrderBy("id asc")
    private Set<User> users;

    @ManyToMany(cascade =
            {
                    CascadeType.DETACH,
                    CascadeType.MERGE,
                    CascadeType.REFRESH,
                    CascadeType.PERSIST
            },
            targetEntity = Group.class)
    @JoinTable(
            name = "ADMIN_USER_GROUP_AUTHORITY",
            joinColumns = @JoinColumn(name = "AUTHORITY_ID", referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name = "GROUP_ID", referencedColumnName = "ID")
    )
    @OrderBy("id asc")
    private Set<Group> groups;

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

    public Set<Group> getGroups() {
        return groups;
    }

    public void setGroups(Set<Group> groups) {
        this.groups = groups;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Authority authority = (Authority) o;

        if (!getId().equals(authority.getId())) return false;
        return getName().equals(authority.getName());
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(getId());
        result = 31 * result + Objects.hashCode(getName());
        return result;
    }

    @Override
    public String toString() {
        return "Authority{" +
                "id=" + id +
                ", name='" + name + '\'' +
                "} " + super.toString();
    }
}
