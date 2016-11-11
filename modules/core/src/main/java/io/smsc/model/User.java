package io.smsc.model;

import io.smsc.converters.CryptoConverter;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "USERS", uniqueConstraints = {@UniqueConstraint(columnNames = {"username","email"}, name = "users_unique_username_email_idx")})
public class User extends BaseEntity{

    @Column(name = "username", nullable = false, unique = true)
    @NotEmpty(message = "User's name cannot be empty")
    private String username;

    @Column(name = "password", nullable = false)
    @NotEmpty(message = "User's password cannot be empty")
    @Convert(converter = CryptoConverter.class)
    private String password;

    @Column(name = "first_name", nullable = false)
    @NotEmpty(message = "User's first name cannot be empty")
    private String firstName;

    @Column(name = "surname", nullable = false)
    @NotEmpty(message = "User's surname cannot be empty")
    private String surName;

    @Column(name = "email", nullable = false, unique = true)
    @Email
    @NotEmpty(message = "User's email cannot be empty")
    private String email;

    @Column(name = "active", nullable = false, columnDefinition = "boolean default true")
    private boolean active = true;

    @Column(name = "created", columnDefinition = "timestamp default now()")
    private Date created = new Date();

    @Column(name = "blocked", nullable = false, columnDefinition = "boolean default false")
    private boolean blocked = false;

    @ManyToMany()
    @JoinTable(
            name = "users_roles",
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
