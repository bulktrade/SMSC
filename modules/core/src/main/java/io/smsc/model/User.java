package io.smsc.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "USER_ACCOUNT", uniqueConstraints = {@UniqueConstraint(columnNames = {"USERNAME","EMAIL"}, name = "users_unique_username_email_idx")})
public class User extends BaseEntity {

    @Column(name = "USERNAME", nullable = false, unique = true)
    @NotEmpty(message = "{user.username.validation}")
    private String username;

    @Column(name = "PASSWORD", nullable = false)
    @NotEmpty(message = "{user.password.empty.validation}")
    private String password;

    @Column(name="SALT")
    private String salt;

    @Column(name = "FIRST_NAME", nullable = false)
    @NotEmpty(message = "{user.firstname.validation}")
    private String firstName;

    @Column(name = "SURNAME", nullable = false)
    @NotEmpty(message = "{user.surname.validation}")
    private String surName;

    @Column(name = "EMAIL", nullable = false, unique = true)
    @Email(message = "{user.email.format.validation}")
    @NotEmpty(message = "{user.email.empty.validation}")
    private String email;

    @Column(name = "ACTIVE", nullable = false, columnDefinition = "boolean default true")
    private boolean active = true;

    @Column(name = "CREATED", columnDefinition = "timestamp default now()")
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="CET")
    private Date created = new Date();

    @Column(name = "BLOCKED", nullable = false, columnDefinition = "boolean default false")
    private boolean blocked = false;

    @ManyToMany()
    @OrderBy
    @JoinTable(
            name = "USER_ROLE",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    private List<Role> roles;

    public User() {
    }

    public User(User user) {
        this(user.getId(),user.getUsername(),user.getPassword(),user.getFirstName(),user.getSurName(),user.getEmail(),user.isActive(),user.isBlocked());
    }

    public User(Long id, String username, String password, String firstName, String surName, String email, boolean active, boolean blocked) {
        super(id);
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.surName = surName;
        this.email = email;
        this.active = active;
        this.blocked = blocked;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurName() {
        return surName;
    }

    public void setSurName(String surName) {
        this.surName = surName;
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

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public boolean addRole(Role role){
        return this.roles.add(role);
    }

    public boolean removeRole(Role role){
        return this.roles.remove(role);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", surName='" + surName + '\'' +
                ", email='" + email + '\'' +
                ", active=" + active +
                ", created=" + created +
                ", blocked=" + blocked +
                ", roles=" + roles +
                '}';
    }
}
