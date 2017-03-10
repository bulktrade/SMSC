package io.smsc.repository.customer;

import io.smsc.AbstractTest;
import io.smsc.model.admin.User;
import io.smsc.model.customer.Customer;
import org.junit.Before;
import org.junit.Test;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class CustomerUnitTest extends AbstractTest {

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
        customer1.setParent(new Customer());
        customer1.setUsers(Collections.emptySet());
        customer1.setContacts(Collections.emptySet());
        customer2.setId(1L);
        customer2.setCompanyName("newCompany");
        customer2.setStreet("newStreet");
        customer2.setStreet2("newStreet2");
        customer2.setPostcode("79005");
        customer2.setCountry("Ukraine");
        customer2.setCity("Lviv");
        customer2.setVatid("9999999.0");
        customer2.setParent(new Customer());
        customer2.setUsers(Collections.emptySet());
        customer2.setContacts(Collections.emptySet());
    }

    @Test
    public void testEqualsAndHashcodeSameCustomer() throws Exception {
        assertThat(customer1).isEqualTo(customer1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualCustomers() throws Exception {
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
    public void testEqualsAndHashcodePairOfNonEqualCustomers() throws Exception {
        customer2.setId(2L);
        assertThat(customer1).isNotEqualTo(customer2);
    }

    @Test
    public void testEqualsAndHashcodeEqualCustomersInSet() throws Exception {
        Set<Customer> set = new HashSet<>();
        set.add(customer1);
        set.add(customer2);
        assertThat(set.size()).isEqualTo(1);
    }
}
