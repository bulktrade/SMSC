package io.smsc.repository.customer;

import io.smsc.model.admin.User;
import io.smsc.model.customer.Customer;
import org.junit.Before;
import org.junit.Test;

import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class CustomerUnitTest {

    private Customer customer1;
    private Customer customer2;

    @Before
    public void initCustomers() throws Exception {
        this.customer1 = new Customer();
        this.customer2 = new Customer();
        customer1.setId(1L);
        customer1.setCompanyName("newCompany");
        customer1.setStreet("newStreet");
        customer1.setStreet2("newStreet2");
        customer1.setPostcode("79005");
        customer1.setCountry("Ukraine");
        customer1.setCity("Lviv");
        customer1.setVatid("9999999.0");
        customer1.setUsers(Collections.emptySet());
        customer1.setSmppUsers(Collections.emptySet());
        customer1.setContacts(Collections.emptySet());
        customer1.setCreatedBy(new User());
        customer1.setLastModifiedBy(new User());
        customer1.setCreatedDate(new Date());
        customer1.setLastModifiedDate(new Date());
        customer1.setVersion(0L);
        customer2.setId(1L);
        customer2.setCompanyName("newCompany");
        customer2.setStreet("newStreet");
        customer2.setStreet2("newStreet2");
        customer2.setPostcode("79005");
        customer2.setCountry("Ukraine");
        customer2.setCity("Lviv");
        customer2.setVatid("9999999.0");
        customer2.setUsers(Collections.emptySet());
        customer2.setSmppUsers(Collections.emptySet());
        customer2.setContacts(Collections.emptySet());
        customer2.setCreatedBy(new User());
        customer2.setLastModifiedBy(new User());
        customer2.setCreatedDate(new Date());
        customer2.setLastModifiedDate(new Date());
        customer2.setVersion(0L);
    }

    @Test
    public void testEqualsAndHashcodeSameCustomer() throws Exception {
        assertThat(customer1).isEqualTo(customer1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualCustomers1() throws Exception {
        assertThat(customer1).isEqualTo(customer2);
        assertThat(customer1.getParent()).isEqualTo(customer2.getParent());
        assertThat(customer1.getUsers()).isEqualTo(customer2.getUsers());
        assertThat(customer1.getSmppUsers()).isEqualTo(customer2.getSmppUsers());
        assertThat(customer1.getContacts()).isEqualTo(customer2.getContacts());
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualCustomers2() throws Exception {
        customer1.setVatid(null);
        customer2.setVatid(null);

        assertThat(customer1).isEqualTo(customer2);
    }

    @Test
    public void testEqualsAndHashcodeCustomerAndNull() throws Exception {
        assertThat(customer1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeCustomerAndOtherObject() throws Exception {
        assertThat(customer1).isNotEqualTo(new User());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualCustomers1() throws Exception {
        customer2.setId(2L);

        assertThat(customer1).isNotEqualTo(customer2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualCustomers2() throws Exception {
        customer2.setCompanyName("some company");

        assertThat(customer1).isNotEqualTo(customer2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualCustomers3() throws Exception {
        customer2.setStreet("some street");

        assertThat(customer1).isNotEqualTo(customer2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualCustomers4() throws Exception {
        customer2.setStreet2("some street");

        assertThat(customer1).isNotEqualTo(customer2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualCustomers5() throws Exception {
        customer2.setPostcode("some postcode");

        assertThat(customer1).isNotEqualTo(customer2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualCustomers6() throws Exception {
        customer2.setCountry("some country");

        assertThat(customer1).isNotEqualTo(customer2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualCustomers7() throws Exception {
        customer2.setCity("some sity");

        assertThat(customer1).isNotEqualTo(customer2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualCustomers8() throws Exception {
        customer2.setVatid(null);

        assertThat(customer1).isNotEqualTo(customer2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualCustomers9() throws Exception {
        customer1.setVatid(null);

        assertThat(customer1).isNotEqualTo(customer2);
    }

    @Test
    public void testEqualsAndHashcodeEqualCustomersInSet() throws Exception {
        Set<Customer> set = new HashSet<>();
        set.add(customer1);
        set.add(customer2);

        assertThat(set.size()).isEqualTo(1);
    }

    @Test
    public void testCustomerToString() throws Exception {
        assertThat(customer1.toString()).isEqualTo("{id = " + customer1.getId() +
                ", companyName = '" + customer1.getCompanyName() + '\'' +
                ", street = '" + customer1.getStreet() + '\'' +
                ", street2 = '" + customer1.getStreet2() + '\'' +
                ", postcode = '" + customer1.getPostcode() + '\'' +
                ", country = '" + customer1.getCountry() + '\'' +
                ", city = '" + customer1.getCity() + '\'' +
                ", vatid = '" + customer1.getVatid() + '\'' +
                ", version = " + customer1.getVersion() +
                ", createdDate = '" + customer1.getCreatedDate() + '\'' +
                ", lastModifiedDate = '" + customer1.getLastModifiedDate() + '\'' +
                "}");
    }
}
