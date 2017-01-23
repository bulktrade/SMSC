package io.smsc.model.customer;

import io.smsc.model.BaseEntity;
import io.smsc.model.User;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

/**
 * Specifies Customer class as an entity class.
 *
 * @author  Nazar Lipkovskyy
 * @see     BaseEntity
 * @since   0.0.1-SNAPSHOT
 */
@Entity
@Table(name = "CUSTOMER", uniqueConstraints = {@UniqueConstraint(columnNames = "CUSTOMER_ID", name = "customers_unique_customer_id_idx")})
public class Customer extends BaseEntity {

    @Column(name = "CUSTOMER_ID", nullable = false, unique = true)
    @NotNull(message = "{customer.customerId.validation}")
    private Double customerId;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="PARENT_CUSTOMER_ID")
    private Customer parentCustomer;

    @OneToMany(mappedBy = "customer")
    private Set<CustomerContact> contacts;

    @ManyToMany()
    @OrderBy
    @JoinTable(
            name = "CUSTOMER_HAS_USER_ACCOUNT",
            joinColumns = @JoinColumn(name = "CUSTOMER_ID", referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "ID")
    )
    private Set<User> users;

    /**
     * This method is used for removing all links on Customer entity from
     * appropriate CustomerContact entities before entity is removed. Without
     * it deleting entity can cause <code>ConstraintViolationException<code/>
     */
    @PreRemove
    private void removeCustomerFromContacts() {
        for (CustomerContact contact : contacts) {
            contact.setCustomer(null);
        }
    }

    public Customer() {
    }

    public Customer(Customer customer) {
        this(customer.getId(),customer.getCustomerId(),customer.getCompanyName(),customer.getStreet(),customer.getStreet2(),
                customer.getPostcode(),customer.getCountry(),customer.getCity(),customer.getVatid());
    }

    public Customer(Long id, Double customerId, String companyName, String street, String street2, String postcode, String country, String city, Double vatid) {
        super(id);
        this.customerId = customerId;
        this.companyName = companyName;
        this.street = street;
        this.street2 = street2;
        this.postcode = postcode;
        this.country = country;
        this.city = city;
        this.vatid = vatid;
    }

    public Double getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Double customerId) {
        this.customerId = customerId;
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

    public Customer getParentCustomer() {
        return parentCustomer;
    }

    public void setParentCustomer(Customer parentCustomer) {
        this.parentCustomer = parentCustomer;
    }

    public Set<CustomerContact> getContacts() {
        return contacts;
    }

    public void setContacts(Set<CustomerContact> contacts) {
        this.contacts = contacts;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public void addContact(CustomerContact customerContact){
        this.contacts.add(customerContact);
    }

    public void removeContact(CustomerContact customerContact){
        this.contacts.remove(customerContact);
    }

    public void addUser(User user){
        this.users.add(user);
    }

    public void removeUser(User user){
        this.users.remove(user);
    }

    @Override
    public String toString() {
        return "Customer{" +
                "customerId=" + customerId +
                ", companyName='" + companyName + '\'' +
                ", street='" + street + '\'' +
                ", street2='" + street2 + '\'' +
                ", postcode='" + postcode + '\'' +
                ", country='" + country + '\'' +
                ", city='" + city + '\'' +
                ", vatid=" + vatid +
                ", parentCustomer=" + parentCustomer +
                ", contacts=" + contacts +
                ", users=" + users +
                "} " + super.toString();
    }
}
