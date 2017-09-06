package io.smsc.repository.customer;

import io.smsc.model.admin.User;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.SmppUser;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class SmppCustomerUserUnitTest {

    private SmppUser user1;
    private SmppUser user2;

    @Before
    public void initSmppCustomerUsers() throws Exception {
        this.user1 = new SmppUser();
        this.user2 = new SmppUser();
        user1.setId(1L);
        user1.setUsername("Old Johnny");
        user1.setActive(true);
        user1.setCustomer(null);
        user1.setCreatedBy(new User());
        user1.setLastModifiedBy(new User());
        user1.setCreatedDate(new Date());
        user1.setLastModifiedDate(new Date());
        user1.setVersion(0L);
        user2.setId(1L);
        user2.setUsername("Old Johnny");
        user2.setActive(true);
        user2.setCustomer(null);
        user2.setCreatedBy(new User());
        user2.setLastModifiedBy(new User());
        user2.setCreatedDate(new Date());
        user2.setLastModifiedDate(new Date());
        user2.setVersion(0L);
    }

    @Test
    public void testEqualsAndHashcodeSameSmppCustomerUser() throws Exception {
        assertThat(user1).isEqualTo(user1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualSmppCustomerUsers() throws Exception {
        assertThat(user1).isEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodeSmppCustomerUserAndNull() throws Exception {
        assertThat(user1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeSmppCustomerUserAndOtherObject() throws Exception {
        assertThat(user1).isNotEqualTo(new Customer());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualSmppCustomerUsers1() throws Exception {
        user2.setId(2L);

        assertThat(user1).isNotEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualSmppCustomerUsers2() throws Exception {
        user2.setUsername("some username");

        assertThat(user1).isNotEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodeEqualSmppCustomerUsersInSet() throws Exception {
        Set<SmppUser> set = new HashSet<>();
        set.add(user1);
        set.add(user2);

        assertThat(set.size()).isEqualTo(1);
    }

    @Test
    public void testSmppCustomerUserToString() throws Exception {
        assertThat(user1.toString()).isEqualTo("{id = " + user1.getId() +
                ", username = '" + user1.getUsername() + '\'' +
                ", active = " + user1.isActive() +
                ", version = " + user1.getVersion() +
                ", createdDate = '" + user1.getCreatedDate() + '\'' +
                ", lastModifiedDate = '" + user1.getLastModifiedDate() + '\'' +
                "}");
    }
}
