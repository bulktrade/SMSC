package io.smsc.repository.customer.data_jpa;

import io.smsc.AbstractTest;
import io.smsc.model.customer.Customer;
import org.junit.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.test.context.support.WithMockUser;

import javax.validation.ConstraintViolationException;
import java.util.Arrays;

import static io.smsc.test_data.CustomerTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class CustomerValidationTest extends AbstractTest {

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCustomerIdSave() throws Exception {
        Customer newCustomer = new Customer(null,null,"newCompany","newStreet",
                "newStreet2","79005", "Ukraine", "Lviv", 9999999.0);
        customerRepository.save(newCustomer);
        customerRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCustomerCompanyNameSave() throws Exception {
        Customer newCustomer = new Customer(null,10.0,"","newStreet",
                "newStreet2","79005", "Ukraine", "Lviv", 9999999.0);
        customerRepository.save(newCustomer);
        customerRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCustomerStreetSave() throws Exception {
        Customer newCustomer = new Customer(null,10.0,"newCompany","",
                "newStreet2","79005", "Ukraine", "Lviv", 9999999.0);
        customerRepository.save(newCustomer);
        customerRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCustomerStreet2Save() throws Exception {
        Customer newCustomer = new Customer(null,10.0,"newCompany","newStreet",
                "","79005", "Ukraine", "Lviv", 9999999.0);
        customerRepository.save(newCustomer);
        customerRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCustomerPostcodeSave() throws Exception {
        Customer newCustomer = new Customer(null,10.0,"newCompany","newStreet",
                "newStreet2","", "Ukraine", "Lviv", 9999999.0);
        customerRepository.save(newCustomer);
        customerRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCustomerCountrySave() throws Exception {
        Customer newCustomer = new Customer(null,10.0,"newCompany","newStreet",
                "newStreet2","79005", "", "Lviv", 9999999.0);
        customerRepository.save(newCustomer);
        customerRepository.findAll();
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyCustomerCitySave() throws Exception {
        Customer newCustomer = new Customer(null,10.0,"newCompany","newStreet",
                "newStreet2","79005", "Ukraine", "", 9999999.0);
        customerRepository.save(newCustomer);
        customerRepository.findAll();
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void testDuplicateCustomerIdSave() throws Exception {
        Customer newCustomer = new Customer(CUSTOMER_1);
        newCustomer.setId(null);
        customerRepository.save(newCustomer);
        CUSTOMER_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newCustomer,CUSTOMER_1), customerRepository.findAll());
    }
}
