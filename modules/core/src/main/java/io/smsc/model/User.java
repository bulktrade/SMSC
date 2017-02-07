package io.smsc.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.smsc.listeners.Encrypt;
import io.smsc.listeners.EncryptionListener;
import io.smsc.model.dashboard.Dashboard;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;
import java.util.Set;

/**
 * Specifies User class as an entity class.
 *
 * @author  Nazar Lipkovskyy
 * @see     BaseEntity
 * @since   0.0.1-SNAPSHOT
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

    @Column(name = "USERNAME", nullable = false, unique = true)
    @NotEmpty(message = "{user.username.validation}")
    private String username;

    @Encrypt
    @Column(name = "PASSWORD", nullable = false)
    @NotEmpty(message = "{user.password.empty.validation}")
    private String password;

    @Column(name="SALT")
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

    @Column(name = "CREATED",nullable = false, updatable = false)
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="UTC")
    private Date created = new Date();

    @Column(name = "BLOCKED", nullable = false)
    private Boolean blocked = false;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "USER_ROLE",
            joinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name = "ROLE_ID", referencedColumnName = "ID")
    )
    private Set<Role> roles;

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Dashboard> dashboards;

    public User() {
    }

    public User(User user) {
        this(user.getId(), user.getUsername(), user.getPassword(), user.getFirstname(), user.getSurname(), user.getEmail(), user.isActive(), user.isBlocked());
    }

    public User(Long id, String username, String password, String firstname, String surname, String email, boolean active, boolean blocked) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.surname = surname;
        this.email = email;
        this.active = active;
        this.blocked = blocked;
    }

    @JsonIgnore
    public boolean isNew() {
        return (getId() == null);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String userName) {
        this.username = userName;
    }

    public String getPassword() {
        return password;
    }

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

    public String getSalt() {
        return salt;
    }

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

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", salt='" + salt + '\'' +
                ", firstname='" + firstname + '\'' +
                ", surname='" + surname + '\'' +
                ", email='" + email + '\'' +
                ", active=" + active +
                ", created=" + created +
                ", blocked=" + blocked +
                "} " + super.toString();
    }
}
