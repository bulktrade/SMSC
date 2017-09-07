package io.smsc.model.customer;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.smsc.converters.CryptoConverter;
import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.util.Objects;

/**
 * Specifies SmppUser class as an entity class.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @since 0.0.4-SNAPSHOT
 */
@Entity
@Table(name = "SMPP_CUSTOMER_USER_ACCOUNT", uniqueConstraints = {@UniqueConstraint(columnNames = {"USERNAME"},
        name = "smpp_customer_user_username_idx")})
public class SmppUser extends BaseEntity {

    @Id
    @SequenceGenerator(name = "smpp_customer_user_account_seq", sequenceName = "smpp_customer_user_account_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "smpp_customer_user_account_seq")
    @Column(name = "ID")
    // PROPERTY access for id due to bug: https://hibernate.atlassian.net/browse/HHH-3718
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Column(name = "USERNAME", nullable = false, unique = true)
    @Pattern(regexp = "[0-9a-zA-Z+\\-\\\\]{0,8}", message = "{smpp.user.username.format.message}")
    @NotEmpty(message = "{user.username.empty.message}")
    private String username;

    @Convert(converter = CryptoConverter.class)
    @Column(name = "PASSWORD", nullable = false)
    @Pattern(regexp = "[0-9a-zA-Z+\\-\\\\]{0,8}", message = "{smpp.user.password.format.message}")
    @NotEmpty(message = "{user.password.empty.message}")
    @JsonIgnore
    private String password;

    @Column(name = "ACTIVE", nullable = false)
    private Boolean active = true;

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

    public void setUsername(String username) {
        this.username = username;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SmppUser user = (SmppUser) o;

        if (!getId().equals(user.getId())) return false;
        return getUsername().equals(user.getUsername());
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(getId());
        result = 31 * result + Objects.hashCode(getUsername());
        return result;
    }

    @Override
    public String toString() {
        return "{id = " + id +
                ", username = '" + username + '\'' +
                ", active = " + active +
                ", version = " + version +
                ", createdDate = '" + createdDate + '\'' +
                ", lastModifiedDate = '" + lastModifiedDate + '\'' +
                "}";
    }
}
