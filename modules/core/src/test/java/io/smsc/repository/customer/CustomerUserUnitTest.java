package io.smsc.repository.customer;

import io.smsc.model.customer.Customer;
import io.smsc.model.customer.Salutation;
import io.smsc.model.customer.User;
import org.junit.Before;
import org.junit.Test;

import java.time.Instant;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class CustomerUserUnitTest {

    private User user1;
    private User user2;

    @Before
    public void initCustomerUsers() throws Exception {
        this.user1 = new User();
        this.user2 = new User();
        user1.setId(1L);
        user1.setUsername("Old Johnny");
        user1.setFirstname("John");
        user1.setSurname("Forrester");
        user1.setEmail("john@gmail.com");
        user1.setActive(true);
        user1.setBlocked(false);
        user1.setSalutation(Salutation.MR);
        user1.setCustomer(null);
        user2.setId(1L);
        user2.setUsername("Old Johnny");
        user2.setFirstname("John");
        user2.setSurname("Forrester");
        user2.setEmail("john@gmail.com");
        user2.setActive(true);
        user2.setBlocked(false);
        user2.setSalutation(Salutation.MR);
        user2.setCustomer(null);
    }

    @Test
    public void testEqualsAndHashcodeSameCustomerUser() throws Exception {
        assertThat(user1).isEqualTo(user1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualCustomerUsers() throws Exception {
        assertThat(user1).isEqualTo(user2);
        assertThat(user1.getPassword()).isEqualTo(user2.getPassword());
        assertThat(user1.getCustomer()).isEqualTo(user2.getCustomer());
    }

    @Test
    public void testEqualsAndHashcodeCustomerUserAndNull() throws Exception {
        assertThat(user1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeCustomerUserAndOtherObject() throws Exception {
        assertThat(user1).isNotEqualTo(new Customer());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualCustomerUsers1() throws Exception {
        user2.setId(2L);

        assertThat(user1).isNotEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualCustomerUsers2() throws Exception {
        user2.setSalutation(Salutation.MRS);

        assertThat(user1).isNotEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualCustomerUsers3() throws Exception {
        user2.setUsername("some username");

        assertThat(user1).isNotEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualCustomerUsers4() throws Exception {
        user2.setFirstname("some firstname");

        assertThat(user1).isNotEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualCustomerUsers5() throws Exception {
        user2.setSurname("some surname");

        assertThat(user1).isNotEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualCustomerUsers6() throws Exception {
        user2.setEmail("email@gmail.com");

        assertThat(user1).isNotEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualCustomerUsers7() throws Exception {
        user2.setCreated(Date.from(Instant.EPOCH));

        assertThat(user1).isNotEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodeEqualCustomerUsersInSet() throws Exception {
        Set<User> set = new HashSet<>();
        set.add(user1);
        set.add(user2);

        assertThat(set.size()).isEqualTo(1);
    }

    @Test
    public void testCustomerUserToString() throws Exception {
        assertThat(user1.toString()).isEqualTo("{id = " + user1.getId() +
                ", salutation = '" + user1.getSalutation() + '\'' +
                ", username = '" + user1.getUsername() + '\'' +
                ", firstname = '" + user1.getFirstname() + '\'' +
                ", surname = '" + user1.getSurname() + '\'' +
                ", email = '" + user1.getEmail() + '\'' +
                ", active = " + user1.isActive() +
                ", created = '" + user1.getCreated() + '\'' +
                ", blocked = " + user1.isBlocked() +
                ", version = " + user1.getVersion() +
                ", createdDate = '" + user1.getCreatedDate() + '\'' +
                ", lastModifiedDate = '" + user1.getLastModifiedDate() + '\'' +
                "}");
    }
}
