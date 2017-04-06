package io.smsc.repository.customer;

import io.smsc.model.admin.User;
import io.smsc.model.customer.Contact;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.Salutation;
import io.smsc.model.customer.Type;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class ContactUnitTest {

    private Contact contact1;
    private Contact contact2;

    @Before
    public void initContacts() throws Exception {
        this.contact1 = new Contact();
        this.contact2 = new Contact();
        contact1.setId(1L);
        contact1.setFirstname("SMSC");
        contact1.setSurname("SMSC");
        contact1.setPhone("0322222222");
        contact1.setMobilePhone("0632222222");
        contact1.setFax("new_fake_fax");
        contact1.setEmailAddress("new_fake@gmail.com");
        contact1.setType(Type.PRIMARY);
        contact1.setSalutation(Salutation.MRS);
        contact1.setCreatedBy(new User());
        contact1.setLastModifiedBy(new User());
        contact1.setCreatedDate(new Date());
        contact1.setLastModifiedDate(new Date());
        contact1.setVersion(0L);
        contact2.setId(1L);
        contact2.setFirstname("SMSC");
        contact2.setSurname("SMSC");
        contact2.setPhone("0322222222");
        contact2.setMobilePhone("0632222222");
        contact2.setFax("new_fake_fax");
        contact2.setEmailAddress("new_fake@gmail.com");
        contact2.setType(Type.PRIMARY);
        contact2.setSalutation(Salutation.MRS);
        contact2.setCreatedBy(new User());
        contact2.setLastModifiedBy(new User());
        contact2.setCreatedDate(new Date());
        contact2.setLastModifiedDate(new Date());
        contact2.setVersion(0L);
    }

    @Test
    public void testEqualsAndHashcodeSameContact() throws Exception {
        assertThat(contact1).isEqualTo(contact1);
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualContacts() throws Exception {
        assertThat(contact1).isEqualTo(contact2);
        assertThat(contact1.getCustomer()).isEqualTo(contact2.getCustomer());
    }

    @Test
    public void testEqualsAndHashcodeContactAndNull() throws Exception {
        assertThat(contact1).isNotEqualTo(null);
    }

    @Test
    public void testEqualsAndHashcodeContactAndOtherObject() throws Exception {
        assertThat(contact1).isNotEqualTo(new Customer());
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualContacts1() throws Exception {
        contact2.setId(2L);

        assertThat(contact1).isNotEqualTo(contact2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualContacts2() throws Exception {
        contact2.setFirstname("some firstname");

        assertThat(contact1).isNotEqualTo(contact2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualContacts3() throws Exception {
        contact2.setSurname("some surname");

        assertThat(contact1).isNotEqualTo(contact2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualContacts4() throws Exception {
        contact2.setPhone("12345678");

        assertThat(contact1).isNotEqualTo(contact2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualContacts5() throws Exception {
        contact2.setMobilePhone("87654321");

        assertThat(contact1).isNotEqualTo(contact2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualContacts6() throws Exception {
        contact2.setFax("81726354");

        assertThat(contact1).isNotEqualTo(contact2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualContacts7() throws Exception {
        contact2.setEmailAddress("email@gmail.com");

        assertThat(contact1).isNotEqualTo(contact2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualContacts8() throws Exception {
        contact2.setType(Type.TECHNICAL);

        assertThat(contact1).isNotEqualTo(contact2);
    }

    @Test
    public void testEqualsAndHashcodePairOfNonEqualContacts9() throws Exception {
        contact2.setSalutation(Salutation.MR);

        assertThat(contact1).isNotEqualTo(contact2);
    }

    @Test
    public void testEqualsAndHashcodeEqualContactsInSet() throws Exception {
        Set<Contact> set = new HashSet<>();
        set.add(contact1);
        set.add(contact2);

        assertThat(set.size()).isEqualTo(1);
    }

    @Test
    public void testContactToString() throws Exception {
        assertThat(contact1.toString()).isEqualTo("{id = " + contact1.getId() +
                ", firstname = '" + contact1.getFirstname() + '\'' +
                ", surname = '" + contact1.getSurname() + '\'' +
                ", phone = '" + contact1.getPhone() + '\'' +
                ", mobilePhone = '" + contact1.getMobilePhone() + '\'' +
                ", fax = '" + contact1.getFax() + '\'' +
                ", emailAddress = '" + contact1.getEmailAddress() + '\'' +
                ", type = '" + contact1.getType() + '\'' +
                ", salutation = '" + contact1.getSalutation() + '\'' +
                ", version = " + contact1.getVersion() +
                ", createdDate = '" + contact1.getCreatedDate() + '\'' +
                ", lastModifiedDate = '" + contact1.getLastModifiedDate() + '\'' +
                "}");
    }
}
