package io.smsc.model.customer;

import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "CUSTOMER_CONTACT", uniqueConstraints = {@UniqueConstraint(columnNames = "EMAIL_ADDRESS", name = "customer_contact_unique_email_address_idx")})
public class CustomerContact extends BaseEntity {

    @Column(name = "FIRST_NAME", nullable = false)
    @NotEmpty(message = "{customer.contact.firstname.validation}")
    private String firstname;

    @Column(name = "SURNAME", nullable = false)
    @NotEmpty(message = "{customer.contact.surname.validation}")
    private String surname;

    @Column(name = "PHONE", nullable = false)
    @NotEmpty(message = "{customer.contact.phone.validation}")
    private String phone;

    @Column(name = "MOBILE_PHONE", nullable = false)
    @NotEmpty(message = "{customer.contact.mobilePhone.validation}")
    private String mobilePhone;

    @Column(name = "FAX", nullable = false)
    @NotEmpty(message = "{customer.contact.fax.validation}")
    private String fax;

    @Column(name = "EMAIL_ADDRESS", nullable = false, unique = true)
    @Email(message = "{customer.contact.emailAddress.format.validation}")
    @NotEmpty(message = "{customer.contact.emailAddress.validation}")
    private String emailAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="CUSTOMER")
    private Customer customer;

    @Enumerated(EnumType.STRING)
    @Column(name = "TYPE", nullable = false)
    @NotNull(message = "{customer.contact.type.validation}")
    private Type type;

    @Enumerated(EnumType.STRING)
    @Column(name = "SALUTATION", nullable = false)
    @NotNull(message = "{customer.contact.salutation.validation}")
    private Salutation salutation;

    public CustomerContact() {
    }

    public CustomerContact(CustomerContact customerContact) {
        this(customerContact.getId(),customerContact.getFirstname(),customerContact.getSurname(),customerContact.getPhone(),
                customerContact.getMobilePhone(),customerContact.getFax(),customerContact.getEmailAddress(),customerContact.getType(),
                customerContact.getSalutation());
    }

    public CustomerContact(Long id, String firstname, String surname, String phone, String mobilePhone, String fax, String emailAddress, Type type, Salutation salutation) {
        super(id);
        this.firstname = firstname;
        this.surname = surname;
        this.phone = phone;
        this.mobilePhone = mobilePhone;
        this.fax = fax;
        this.emailAddress = emailAddress;
        this.type = type;
        this.salutation = salutation;
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
    public String toString() {
        return "CustomerContact{" +
                "firstName='" + firstname + '\'' +
                ", surName='" + surname + '\'' +
                ", phone='" + phone + '\'' +
                ", mobilePhone='" + mobilePhone + '\'' +
                ", fax='" + fax + '\'' +
                ", emailAddress='" + emailAddress + '\'' +
                ", type=" + type +
                ", salutation=" + salutation +
                "} " + super.toString();
    }
}
