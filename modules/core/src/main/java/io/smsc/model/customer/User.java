package io.smsc.model.customer;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.smsc.converters.CryptoConverter;
import io.smsc.listeners.EncryptionListener;
import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Objects;

/**
 * Specifies User class as an entity class.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @since 0.0.1-SNAPSHOT
 */
@Entity(name = "CustomerUser")
@Table(name = "CUSTOMER_USER_ACCOUNT", uniqueConstraints = {@UniqueConstraint(columnNames = {"USERNAME"},
        name = "customer_user_username_idx")})
public class User extends BaseEntity {

    @Id
    @SequenceGenerator(name = "customer_user_account_seq", sequenceName = "customer_user_account_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "customer_user_account_seq")
    @Column(name = "ID")
    // PROPERTY access for id due to bug: https://hibernate.atlassian.net/browse/HHH-3718
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "SALUTATION", nullable = false)
    @NotNull(message = "{user.salutation.null.message}")
    private Salutation salutation;

    @Column(name = "USERNAME", nullable = false, unique = true)
    @NotEmpty(message = "{user.username.empty.message}")
    private String username;

    @Convert(converter = CryptoConverter.class)
    @Column(name = "PASSWORD", nullable = false)
    @NotEmpty(message = "{user.password.empty.message}")
    @JsonIgnore
    private String password;

    @Column(name = "FIRST_NAME", nullable = false)
    @NotEmpty(message = "{user.firstname.empty.message}")
    private String firstname;

    @Column(name = "SURNAME", nullable = false)
    @NotEmpty(message = "{user.surname.empty.message}")
    private String surname;

    @Column(name = "EMAIL", nullable = false)
    @Email(message = "{user.email.format.message}")
    @NotEmpty(message = "{user.email.empty.message}")
    private String email;

    @Column(name = "ACTIVE", nullable = false)
    private Boolean active = true;

    @Column(name = "BLOCKED", nullable = false)
    private Boolean blocked = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CUSTOMER_ID", nullable = false)
    @JsonBackReference
    private Customer customer;

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

    public boolean isBlocked() {
        return blocked;
    }

    public void setBlocked(boolean blocked) {
        this.blocked = blocked;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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

        if (!getId().equals(user.getId())) return false;
        if (getSalutation() != user.getSalutation()) return false;
        if (!getUsername().equals(user.getUsername())) return false;
        if (!getFirstname().equals(user.getFirstname())) return false;
        if (!getSurname().equals(user.getSurname())) return false;
        return getEmail().equals(user.getEmail());
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(getId());
        result = 31 * result + Objects.hashCode(getSalutation());
        result = 31 * result + Objects.hashCode(getUsername());
        result = 31 * result + Objects.hashCode(getFirstname());
        result = 31 * result + Objects.hashCode(getSurname());
        result = 31 * result + Objects.hashCode(getEmail());
        return result;
    }

    @Override
    public String toString() {
        return "{id = " + id +
                ", salutation = '" + salutation + '\'' +
                ", username = '" + username + '\'' +
                ", firstname = '" + firstname + '\'' +
                ", surname = '" + surname + '\'' +
                ", email = '" + email + '\'' +
                ", active = " + active +
                ", blocked = " + blocked +
                ", version = " + version +
                ", createdDate = '" + createdDate + '\'' +
                ", lastModifiedDate = '" + lastModifiedDate + '\'' +
                "}";
    }
}
