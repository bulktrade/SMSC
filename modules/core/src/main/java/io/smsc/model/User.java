package io.smsc.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.smsc.annotation.Encrypt;
import io.smsc.listeners.EncryptionListener;
import io.smsc.model.customer.Salutation;
import io.smsc.model.dashboard.Dashboard;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

/**
 * Specifies User class as an entity class.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @since 0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "USER_ACCOUNT", uniqueConstraints = {@UniqueConstraint(columnNames = {"USERNAME"}, name = "users_username_idx")})
@EntityListeners(EncryptionListener.class)
public class User extends BaseEntity {

    @Id
    @SequenceGenerator(name = "user_account_seq", sequenceName = "user_account_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "user_account_seq")
    @Column(name = "ID")
    // PROPERTY access for id due to bug: https://hibernate.atlassian.net/browse/HHH-3718
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "SALUTATION", nullable = false)
    @NotNull(message = "{user.salutation.validation}")
    private Salutation salutation;

    @Column(name = "USERNAME", nullable = false, unique = true)
    @NotEmpty(message = "{user.username.validation}")
    private String username;

    @Encrypt
    @Column(name = "PASSWORD", nullable = false)
    @NotEmpty(message = "{user.password.empty.validation}")
    @JsonIgnore
    private String password;

    @Column(name = "SALT")
    @JsonIgnore
    private String salt;

    @Column(name = "FIRST_NAME", nullable = false)
    @NotEmpty(message = "{user.firstname.validation}")
    private String firstname;

    @Column(name = "SURNAME", nullable = false)
    @NotEmpty(message = "{user.surname.validation}")
    private String surname;

    @Column(name = "EMAIL", nullable = false)
    @Email(message = "{user.email.format.validation}")
    @NotEmpty(message = "{user.email.empty.validation}")
    private String email;

    @Column(name = "ACTIVE", nullable = false)
    private Boolean active = true;

    @Column(name = "CREATED", nullable = false, updatable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    private Date created = new Date();

    @Column(name = "BLOCKED", nullable = false)
    private Boolean blocked = false;

    @ManyToMany(cascade =
            {
                    CascadeType.DETACH,
                    CascadeType.MERGE,
                    CascadeType.REFRESH,
                    CascadeType.PERSIST
            },
            targetEntity = Role.class)
    @JoinTable(
            name = "USER_ROLE",
            joinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name = "ROLE_ID", referencedColumnName = "ID")
    )
    @OrderBy("id asc")
    private Set<Role> roles;

//    /**
//     * This method is used for removing all links on User entity from
//     * appropriate Role entities before entity is removed. Without
//     * it deleting entity can cause <code>ConstraintViolationException<code/>
//     */
//    @PreRemove
//    private void removeRolesFromUsers() {
//        for (Role role : roles) {
//            role.getUsers().remove(this);
//        }
//    }

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    @OrderBy("id asc")
    private Set<Dashboard> dashboards;

    @JsonIgnore
    public boolean isNew() {
        return getId() == null;
    }

    public Long getId() {
        return id;
    }

    @JsonIgnore
    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String userName) {
        this.username = userName;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstName) {
        this.firstname = firstName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surName) {
        this.surname = surName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public boolean isBlocked() {
        return blocked;
    }

    public void setBlocked(boolean blocked) {
        this.blocked = blocked;
    }

    @JsonIgnore
    public String getSalt() {
        return salt;
    }

    @JsonProperty
    public void setSalt(String salt) {
        this.salt = salt;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<Dashboard> getDashboards() {
        return dashboards;
    }

    public void setDashboards(Set<Dashboard> dashboards) {
        this.dashboards = dashboards;
    }

    public Salutation getSalutation() {
        return salutation;
    }

    public void setSalutation(Salutation salutation) {
        this.salutation = salutation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        if (id != null ? !id.equals(user.id) : user.id != null) return false;
        if (salutation != user.salutation) return false;
        if (username != null ? !username.equals(user.username) : user.username != null) return false;
        if (password != null ? !password.equals(user.password) : user.password != null) return false;
        if (salt != null ? !salt.equals(user.salt) : user.salt != null) return false;
        if (firstname != null ? !firstname.equals(user.firstname) : user.firstname != null) return false;
        if (surname != null ? !surname.equals(user.surname) : user.surname != null) return false;
        if (email != null ? !email.equals(user.email) : user.email != null) return false;
        if (active != null ? !active.equals(user.active) : user.active != null) return false;
        if (created != null ? !created.equals(user.created) : user.created != null) return false;
        if (blocked != null ? !blocked.equals(user.blocked) : user.blocked != null) return false;
        if (roles != null ? !roles.equals(user.roles) : user.roles != null) return false;
        return dashboards != null ? dashboards.equals(user.dashboards) : user.dashboards == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (salutation != null ? salutation.hashCode() : 0);
        result = 31 * result + (username != null ? username.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (salt != null ? salt.hashCode() : 0);
        result = 31 * result + (firstname != null ? firstname.hashCode() : 0);
        result = 31 * result + (surname != null ? surname.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (active != null ? active.hashCode() : 0);
        result = 31 * result + (created != null ? created.hashCode() : 0);
        result = 31 * result + (blocked != null ? blocked.hashCode() : 0);
        result = 31 * result + (roles != null ? roles.hashCode() : 0);
        result = 31 * result + (dashboards != null ? dashboards.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", salutation=" + salutation +
                ", username='" + username + '\'' +
                ", salt='" + salt + '\'' +
                ", firstname='" + firstname + '\'' +
                ", surname='" + surname + '\'' +
                ", email='" + email + '\'' +
                ", active=" + active +
                ", created=" + created +
                ", blocked=" + blocked +
                ", roles=" + roles +
                ", dashboards=" + dashboards +
                '}';
    }
}
