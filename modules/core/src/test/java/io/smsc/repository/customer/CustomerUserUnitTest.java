package io.smsc.repository.customer;

import io.smsc.AbstractTest;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.Salutation;
import io.smsc.model.customer.User;
import org.junit.Before;
import org.junit.Test;

import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class CustomerUserUnitTest extends AbstractTest {

    private User user1;
    private User user2;

    @Before
    public void initUsers() throws Exception {
        this.user1 = new User();
        this.user2 = new User();
        user1.setId(1L);
        user1.setUsername("Old Johnny");
        user1.setFirstname("John");
        user1.setSurname("Forrester");
        user1.setEmail("john@gmail.com");
        user1.setActive(true);
        user1.setBlocked(false);
        user1.setCustomer(new Customer());
        user1.setSalutation(Salutation.MR);
        user2.setId(1L);
        user2.setUsername("Old Johnny");
        user2.setFirstname("John");
        user2.setSurname("Forrester");
        user2.setEmail("john@gmail.com");
        user2.setActive(true);
        user2.setBlocked(false);
        user2.setSalutation(Salutation.MR);
        user2.setCustomer(new Customer());
    }

    @Test
    public void testEqualsAndHashcodeSameUser() throws Exception {
        assertThat(user1).isEqualTo(user1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualUsers() throws Exception {
        assertThat(user1).isEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodeUserAndNull() throws Exception {
        assertThat(user1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeUserAndOtherObject() throws Exception {
        assertThat(user1).isNotEqualTo(new Customer());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualUsers() throws Exception {
        user2.setId(2L);
        assertThat(user1).isNotEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodeEqualUsersInSet() throws Exception {
        Set<User> set = new HashSet<>();
        set.add(user1);
        set.add(user2);
        assertThat(set.size()).isEqualTo(1);
    }
}
