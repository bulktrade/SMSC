package io.smsc.model.customer;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.smsc.model.BaseEntity;
import io.smsc.model.CustomerUser;
import org.hibernate.annotations.*;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import java.util.Set;

/**
 * Specifies Customer class as an entity class.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @since 0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "CUSTOMER")
public class Customer extends BaseEntity {

    @Id
    @SequenceGenerator(name = "customer_seq", sequenceName = "customer_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "customer_seq")
    @Column(name = "ID")
    // PROPERTY access for id due to bug: https://hibernate.atlassian.net/browse/HHH-3718
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Column(name = "COMPANY_NAME", nullable = false)
    @NotEmpty(message = "{customer.companyName.validation}")
    private String companyName;

    @Column(name = "STREET", nullable = false)
    @NotEmpty(message = "{customer.street.validation}")
    private String street;

    @Column(name = "STREET2", nullable = false)
    @NotEmpty(message = "{customer.street2.validation}")
    private String street2;

    @Column(name = "POSTCODE", nullable = false)
    @NotEmpty(message = "{customer.postcode.validation}")
    private String postcode;

    @Column(name = "COUNTRY", nullable = false)
    @NotEmpty(message = "{customer.country.validation}")
    private String country;

    @Column(name = "CITY", nullable = false)
    @NotEmpty(message = "{customer.city.validation}")
    private String city;

    @Column(name = "VATID")
    private Double vatid;

    @ManyToOne(
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.REFRESH,
                    CascadeType.MERGE,
                    CascadeType.PERSIST
            })
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @JoinColumn(name = "PARENT_ID")
    private Customer parent;

    @OneToMany(
            mappedBy = "customer",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    @OrderBy("id asc")
    private Set<CustomerContact> contacts;

    @OneToMany(
            mappedBy = "customer",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    @OrderBy("id asc")
    private Set<CustomerUser> customerUsers;

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

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getStreet2() {
        return street2;
    }

    public void setStreet2(String street2) {
        this.street2 = street2;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Double getVatid() {
        return vatid;
    }

    public void setVatid(Double vatid) {
        this.vatid = vatid;
    }

    public Customer getParent() {
        return parent;
    }

    public void setParent(Customer parent) {
        this.parent = parent;
    }

    public Set<CustomerContact> getContacts() {
        return contacts;
    }

    public void setContacts(Set<CustomerContact> contacts) {
        this.contacts = contacts;
    }

    public Set<CustomerUser> getCustomerUsers() {
        return customerUsers;
    }

    public void setCustomerUsers(Set<CustomerUser> customerUsers) {
        this.customerUsers = customerUsers;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", companyName='" + companyName + '\'' +
                ", street='" + street + '\'' +
                ", street2='" + street2 + '\'' +
                ", postcode='" + postcode + '\'' +
                ", country='" + country + '\'' +
                ", city='" + city + '\'' +
                ", vatid=" + vatid +
                "} " + super.toString();
    }
}
