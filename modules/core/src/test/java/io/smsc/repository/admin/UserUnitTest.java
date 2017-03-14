package io.smsc.repository.admin;

import io.smsc.model.admin.User;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.Salutation;
import org.junit.Before;
import org.junit.Test;

import java.time.Instant;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class UserUnitTest {

    private User user1;
    private User user2;

    @Before
    public void initUsers() throws Exception {
        this.user1 = new User();
        this.user2 = new User();
        user1.setId(1L);
        user1.setUsername("Old Johnny");
        user1.setPassword("password");
        user1.setFirstname("John");
        user1.setSurname("Forrester");
        user1.setEmail("john@gmail.com");
        user1.setActive(true);
        user1.setBlocked(false);
        user1.setSalutation(Salutation.MR);
        user1.setAuthorities(Collections.emptySet());
        user1.setGroups(Collections.emptySet());
        user1.setRoles(Collections.emptySet());
        user1.setDashboards(Collections.emptySet());
        user2.setId(1L);
        user2.setUsername("Old Johnny");
        user2.setPassword("password");
        user2.setFirstname("John");
        user2.setSurname("Forrester");
        user2.setEmail("john@gmail.com");
        user2.setActive(true);
        user2.setBlocked(false);
        user2.setSalutation(Salutation.MR);
        user2.setAuthorities(Collections.emptySet());
        user2.setGroups(Collections.emptySet());
        user2.setRoles(Collections.emptySet());
        user2.setDashboards(Collections.emptySet());
    }

    @Test
    public void testEqualsAndHashcodeSameUser() throws Exception {
        assertThat(user1).isEqualTo(user1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualUsers1() throws Exception {
        assertThat(user1).isEqualTo(user2);
        assertThat(user1.getAuthorities()).isEqualTo(user2.getAuthorities());
        assertThat(user1.getGroups()).isEqualTo(user2.getGroups());
        assertThat(user1.getRoles()).isEqualTo(user2.getRoles());
        assertThat(user1.getDashboards()).isEqualTo(user2.getDashboards());
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
    public void testEqualsAndHashcodePairOfNonEqualUsers1() throws Exception {
        user2.setId(2L);
        assertThat(user1).isNotEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualUsers2() throws Exception {
        user2.setSalutation(Salutation.MRS);
        assertThat(user1).isNotEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualUsers3() throws Exception {
        user2.setUsername("some username");
        assertThat(user1).isNotEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualUsers4() throws Exception {
        user2.setFirstname("some firstname");
        assertThat(user1).isNotEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualUsers5() throws Exception {
        user2.setSurname("some surname");
        assertThat(user1).isNotEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualUsers6() throws Exception {
        user2.setEmail("email@gmail.com");
        assertThat(user1).isNotEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualUsers7() throws Exception {
        user2.setCreated(Date.from(Instant.EPOCH));
        assertThat(user1).isNotEqualTo(user2);
    }

    @Test
    public void testEqualsAndHashcodeEqualUserInSet() throws Exception {
        Set<User> set = new HashSet<>();
        set.add(user1);
        set.add(user2);
        assertThat(set.size()).isEqualTo(1);
    }

    @Test
    public void testUserToString() throws Exception {
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
                ", lastModifiedDate = '" + user1.getLastModifiedDate() + '\'' +
                "}");
    }
}
