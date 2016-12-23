package io.smsc.repository.customer.data_jpa;

import io.smsc.AbstractTest;
import io.smsc.model.User;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.CustomerContact;
import io.smsc.model.customer.Salutation;
import io.smsc.model.customer.Type;
import org.junit.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static io.smsc.test_data.CustomerTestData.*;
import static io.smsc.test_data.UserTestData.*;
import static io.smsc.test_data.CustomerContactTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class CustomerJPATest extends AbstractTest {

    @Test
    public void testDeleteCustomer() throws Exception {
        customerRepository.delete(CUSTOMER_1);
        CUSTOMER_MODEL_MATCHER.assertCollectionEquals(Collections.emptyList(), customerRepository.findAllDistinctByOrderById());
    }

    @Test
    public void testSaveCustomer() throws Exception {
        Customer newCustomer = new Customer(null,2.0,"newCompany","newStreet","newStreet2","79005", "Ukraine", "Lviv", 9999999.0);
        Customer created = customerRepository.save(newCustomer);
        newCustomer.setId(created.getId());
        CUSTOMER_MODEL_MATCHER.assertEquals(newCustomer, customerRepository.getOne(newCustomer.getId()));
    }

    @Test
    public void testGetSingleCustomer() throws Exception {
        Customer customer = customerRepository.getOne(CUSTOMER_ID_1);
        CUSTOMER_MODEL_MATCHER.assertEquals(CUSTOMER_1,customer);
    }

    @Test
    public void testGetAllCustomers() throws Exception {
        Collection<Customer> customers = customerRepository.findAllDistinctByOrderById();
        CUSTOMER_MODEL_MATCHER.assertCollectionEquals(Collections.singletonList(CUSTOMER_1), customers);
    }

    @Test
    public void testUpdateCustomer() throws Exception{
        Customer updated = new Customer(CUSTOMER_1);
        updated.setCity("Monte-Carlo");
        updated.setCompanyName("Monte-Carlo Automobile");
        updated.setCountry("Monaco");
        updated.setCustomerId(5.0);
        customerRepository.save(updated);
        CUSTOMER_MODEL_MATCHER.assertEquals(updated, customerRepository.findOne(CUSTOMER_ID_1));
    }

    @Test
    public void testAddUser() throws Exception {
        User newUser = new User(500L,"Old Johnny","john123456","John","Forrester","john@gmail.com",true,false);
        User created = userRepository.saveOneWithEncryptedPassword(newUser);
        Customer customer = customerRepository.addUser(CUSTOMER_ID_1,created.getId());
        CUSTOMER_MODEL_MATCHER.assertEquals(customer, customerRepository.getOne(CUSTOMER_ID_1));
    }

    @Test
    public void testRemoveUser() throws Exception {
        Customer customer = customerRepository.removeUser(CUSTOMER_ID_1,USER_ID);
        CUSTOMER_MODEL_MATCHER.assertEquals(customer, customerRepository.getOne(CUSTOMER_ID_1));
    }

    @Test
    public void testGetCustomerByCustomerId() throws Exception {
        Customer customer = customerRepository.findByCustomerId(1.0);
        CUSTOMER_MODEL_MATCHER.assertEquals(CUSTOMER_1,customer);
    }
}
