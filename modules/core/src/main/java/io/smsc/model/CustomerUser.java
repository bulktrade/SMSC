package io.smsc.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.smsc.annotation.Encrypt;
import io.smsc.listeners.EncryptionListener;
import io.smsc.model.customer.Customer;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.util.Date;

/**
 * Specifies CustomerUser class as an entity class.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @since 0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "CUSTOMER_USER_ACCOUNT", uniqueConstraints = {@UniqueConstraint(columnNames = {"USERNAME"}, name = "users_username_idx")})
@EntityListeners(EncryptionListener.class)
public class CustomerUser extends BaseEntity {

    @Id
    @SequenceGenerator(name = "customer_user_account_seq", sequenceName = "customer_user_account_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "customer_user_account_seq")
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CUSTOMER_ID", nullable = false)
    @JsonBackReference
    private Customer customer;

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

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @Override
    public String toString() {
        return "CustomerUser{" +
                "id=" + id +
                ", username='" + username + '\'' +
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
