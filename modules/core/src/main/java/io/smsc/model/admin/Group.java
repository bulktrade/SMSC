package io.smsc.model.admin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.util.Objects;
import java.util.Set;

/**
 * Specifies Group class as an entity class.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @since 0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "ADMIN_USER_GROUP", uniqueConstraints = {@UniqueConstraint(columnNames = "NAME", name = "group_unique_name_idx")})
public class Group extends BaseEntity {

    @Id
    @SequenceGenerator(name = "group_seq", sequenceName = "group_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "group_seq")
    @Column(name = "ID")
    // PROPERTY access for id due to bug: https://hibernate.atlassian.net/browse/HHH-3718
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Column(name = "NAME", nullable = false, unique = true)
    @NotEmpty(message = "{group.empty.validation}")
    @Pattern(regexp = "[A-Z_]+", message = "{group.name.validation}")
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
            name = "ADMIN_USER_GROUP_USER",
            joinColumns = @JoinColumn(name = "GROUP_ID", referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "ID")
    )
    @OrderBy("id asc")
    private Set<User> users;

    @ManyToMany(fetch = FetchType.EAGER, cascade =
            {
                    CascadeType.DETACH,
                    CascadeType.MERGE,
                    CascadeType.REFRESH,
                    CascadeType.PERSIST
            },
            targetEntity = Authority.class)
    @JoinTable(
            name = "ADMIN_USER_GROUP_AUTHORITY",
            joinColumns = @JoinColumn(name = "GROUP_ID", referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name = "AUTHORITY_ID", referencedColumnName = "ID")
    )
    @OrderBy("id asc")
    private Set<Authority> authorities;

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

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Group group = (Group) o;

        if (!getId().equals(group.getId())) return false;
        return getName().equals(group.getName());
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(getId());
        result = 31 * result + Objects.hashCode(getName());
        return result;
    }

    @Override
    public String toString() {
        return "{id = " + id +
                ", name = '" + name + '\'' +
                ", version = " + version +
                ", createdDate = '" + createdDate + '\'' +
                ", lastModifiedDate = '" + lastModifiedDate + '\'' +
                "}";
    }
}
