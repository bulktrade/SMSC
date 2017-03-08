package io.smsc.repository.customer;

import com.google.common.testing.EqualsTester;
import io.smsc.AbstractTest;
import io.smsc.model.admin.User;
import io.smsc.model.customer.Contact;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.Salutation;
import io.smsc.model.customer.Type;
import junit.framework.AssertionFailedError;
import org.junit.Before;
import org.junit.Test;

public class ContactUnitTest extends AbstractTest {

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
        contact1.setCustomer(new Customer());
        contact2.setId(1L);
        contact2.setFirstname("SMSC");
        contact2.setSurname("SMSC");
        contact2.setPhone("0322222222");
        contact2.setMobilePhone("0632222222");
        contact2.setFax("new_fake_fax");
        contact2.setEmailAddress("new_fake@gmail.com");
        contact2.setType(Type.PRIMARY);
        contact2.setSalutation(Salutation.MRS);
        contact2.setCustomer(new Customer());
    }

    @Test
    public void testEqualsAndHashcodeSameContacts() throws Exception {
        new EqualsTester().addEqualityGroup(contact1, contact1)
                .addEqualityGroup(contact1.hashCode(), contact1.hashCode()).testEquals();
    }

    @Test
    public void testEqualsAndHashcodePairOfEqualContacts() throws Exception {
        new EqualsTester().addEqualityGroup(contact1, contact2)
                .addEqualityGroup(contact1.hashCode(), contact2.hashCode()).testEquals();
    }

    @Test(expected = NullPointerException.class)
    public void testEqualsAndHashcodeContactAndNull() throws Exception {
        new EqualsTester().addEqualityGroup(null, contact1).testEquals();
    }

    @Test(expected = AssertionFailedError.class)
    public void testEqualsAndHashcodeContactAndOtherObject() throws Exception {
        new EqualsTester().addEqualityGroup(contact1, new User()).testEquals();
    }

    @Test(expected = AssertionFailedError.class)
    public void testEqualsAndHashcodePairOfNonEqualContacts() throws Exception {
        contact2.setId(2L);
        new EqualsTester().addEqualityGroup(contact1, contact2).testEquals();
    }
}
