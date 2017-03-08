package io.smsc.repository.customer;

import com.google.common.testing.EqualsTester;
import io.smsc.AbstractTest;
import io.smsc.model.admin.User;
import io.smsc.model.customer.Customer;
import junit.framework.AssertionFailedError;
import org.junit.Before;
import org.junit.Test;

import java.util.Collections;

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
    public void testEqualsAndHashcodeSameCustomers() throws Exception {
        new EqualsTester().addEqualityGroup(customer1, customer1)
                .addEqualityGroup(customer1.hashCode(), customer1.hashCode()).testEquals();
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualCustomers() throws Exception {
        new EqualsTester().addEqualityGroup(customer1, customer2)
                .addEqualityGroup(customer1.hashCode(), customer2.hashCode()).testEquals();
    }

    @Test(expected = NullPointerException.class)
    public void testEqualsAndHashcodeCustomerAndNull() throws Exception {
        new EqualsTester().addEqualityGroup(null, customer1).testEquals();
    }

    @Test(expected = AssertionFailedError.class)
    public void testEqualsAndHashcodeCustomerAndOtherObject() throws Exception {
        new EqualsTester().addEqualityGroup(customer1, new User()).testEquals();
    }

    @Test(expected = AssertionFailedError.class)
    public void testEqualsAndHashcodePairOfNonEqualCustomers() throws Exception {
        customer2.setId(2L);
        new EqualsTester().addEqualityGroup(customer1, customer2).testEquals();
    }
}
