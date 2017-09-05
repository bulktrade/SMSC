package io.smsc.model.customer;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

/**
 * Specifies Contact class as an entity class.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @see Customer
 * @see Type
 * @see Salutation
 * @since 0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "CUSTOMER_CONTACT", uniqueConstraints = {@UniqueConstraint(columnNames = "EMAIL_ADDRESS", name = "customer_contact_unique_email_address_idx")})
public class Contact extends BaseEntity {

    @Id
    @SequenceGenerator(name = "customer_contact_seq", sequenceName = "customer_contact_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "customer_contact_seq")
    @Column(name = "ID")
    // PROPERTY access for id due to bug: https://hibernate.atlassian.net/browse/HHH-3718
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Column(name = "FIRST_NAME", nullable = false)
    @NotEmpty(message = "{customer.contact.firstname.empty.message}")
    private String firstname;

    @Column(name = "SURNAME", nullable = false)
    @NotEmpty(message = "{customer.contact.surname.empty.message}")
    private String surname;

    @Column(name = "PHONE", nullable = false)
    @NotEmpty(message = "{customer.contact.phone.empty.message}")
    private String phone;

    @Column(name = "MOBILE_PHONE", nullable = false)
    @NotEmpty(message = "{customer.contact.mobilePhone.empty.message}")
    private String mobilePhone;

    @Column(name = "FAX", nullable = false)
    @NotEmpty(message = "{customer.contact.fax.empty.message}")
    private String fax;

    @Column(name = "EMAIL_ADDRESS", nullable = false, unique = true)
    @Email(message = "{customer.contact.emailAddress.format.message}")
    @NotEmpty(message = "{customer.contact.emailAddress.empty.message}")
    private String emailAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CUSTOMER_ID", nullable = false)
    @JsonBackReference
    private Customer customer;

    @Enumerated(EnumType.STRING)
    @Column(name = "TYPE", nullable = false)
    @NotNull(message = "{customer.contact.type.null.message}")
    private Type type;

    @Enumerated(EnumType.STRING)
    @Column(name = "SALUTATION", nullable = false)
    @NotNull(message = "{customer.contact.salutation.null.message}")
    private Salutation salutation;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
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

        Contact contact = (Contact) o;

        if (!getId().equals(contact.getId())) return false;
        if (!getFirstname().equals(contact.getFirstname())) return false;
        if (!getSurname().equals(contact.getSurname())) return false;
        if (!getPhone().equals(contact.getPhone())) return false;
        if (!getMobilePhone().equals(contact.getMobilePhone())) return false;
        if (!getFax().equals(contact.getFax())) return false;
        if (!getEmailAddress().equals(contact.getEmailAddress())) return false;
        if (getType() != contact.getType()) return false;
        return getSalutation() == contact.getSalutation();
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(getId());
        result = 31 * result + Objects.hashCode(getFirstname());
        result = 31 * result + Objects.hashCode(getSurname());
        result = 31 * result + Objects.hashCode(getPhone());
        result = 31 * result + Objects.hashCode(getMobilePhone());
        result = 31 * result + Objects.hashCode(getFax());
        result = 31 * result + Objects.hashCode(getEmailAddress());
        result = 31 * result + Objects.hashCode(getType());
        result = 31 * result + Objects.hashCode(getSalutation());
        return result;
    }

    @Override
    public String toString() {
        return "{id = " + id +
                ", firstname = '" + firstname + '\'' +
                ", surname = '" + surname + '\'' +
                ", phone = '" + phone + '\'' +
                ", mobilePhone = '" + mobilePhone + '\'' +
                ", fax = '" + fax + '\'' +
                ", emailAddress = '" + emailAddress + '\'' +
                ", type = '" + type + '\'' +
                ", salutation = '" + salutation + '\'' +
                ", version = " + version +
                ", createdDate = '" + createdDate + '\'' +
                ", lastModifiedDate = '" + lastModifiedDate + '\'' +
                "}";
    }
}
