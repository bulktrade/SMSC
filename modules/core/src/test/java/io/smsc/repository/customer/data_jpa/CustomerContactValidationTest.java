package io.smsc.repository.customer.data_jpa;

import io.smsc.AbstractTest;
import io.smsc.model.customer.CustomerContact;
import io.smsc.model.customer.Salutation;
import io.smsc.model.customer.Type;
import org.junit.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.test.context.support.WithMockUser;

import javax.validation.ConstraintViolationException;
import java.util.Arrays;

import static io.smsc.test_data.CustomerContactTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class CustomerContactValidationTest extends AbstractTest {

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCustomerContactFirstnameSave() throws Exception {
        CustomerContact newContact = new CustomerContact(null, "", "newSurname",
                "0322222222", "0632222222", "new_fake_fax", "fake@gmail.com", Type.PRIMARY, Salutation.MRS);
        customerContactRepository.save(newContact);
        customerContactRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCustomerContactSurnameSave() throws Exception {
        CustomerContact newContact = new CustomerContact(null, "newName", "",
                "0322222222", "0632222222", "new_fake_fax", "fake@gmail.com",
                Type.PRIMARY, Salutation.MRS);
        customerContactRepository.save(newContact);
        customerContactRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCustomerContactPhoneSave() throws Exception {
        CustomerContact newContact = new CustomerContact(null, "newName", "newSurname",
                "", "0632222222", "new_fake_fax", "fake@gmail.com", Type.PRIMARY, Salutation.MRS);
        customerContactRepository.save(newContact);
        customerContactRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCustomerContactMobilePhoneSave() throws Exception {
        CustomerContact newContact = new CustomerContact(null, "newName", "newSurname",
                "0322222222", "", "new_fake_fax", "fake@gmail.com", Type.PRIMARY,
                Salutation.MRS);
        customerContactRepository.save(newContact);
        customerContactRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCustomerContactFaxSave() throws Exception {
        CustomerContact newContact = new CustomerContact(null, "newName", "newSurname",
                "0322222222", "0632222222", "", "fake@gmail.com", Type.PRIMARY,
                Salutation.MRS);
        customerContactRepository.save(newContact);
        customerContactRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCustomerContactEmailAddressSave() throws Exception {
        CustomerContact newContact = new CustomerContact(null, "newName", "newSurname",
                "0322222222", "0632222222", "new_fake_fax", "", Type.PRIMARY,
                Salutation.MRS);
        customerContactRepository.save(newContact);
        customerContactRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCustomerContactTypeSave() throws Exception {
        CustomerContact newContact = new CustomerContact(null, "newName", "newSurname",
                "0322222222", "0632222222", "new_fake_fax", "fake@gmail.com",
                null, Salutation.MRS);
        customerContactRepository.save(newContact);
        customerContactRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCustomerContactSalutationSave() throws Exception {
        CustomerContact newContact = new CustomerContact(null, "newName", "newSurname",
                "0322222222", "0632222222", "new_fake_fax", "fake@gmail.com",
                Type.PRIMARY, null);
        customerContactRepository.save(newContact);
        customerContactRepository.findAll();
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void testDuplicateCustomerContactEmailAddressSave() throws Exception {
        CustomerContact newCustomerContact = new CustomerContact(CUSTOMER_CONTACT_1);
        newCustomerContact.setId(null);
        customerContactRepository.save(newCustomerContact);
        CUSTOMER_CONTACT_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newCustomerContact,CUSTOMER_CONTACT_1), customerContactRepository.findAllDistinctByOrderById());
    }
}
