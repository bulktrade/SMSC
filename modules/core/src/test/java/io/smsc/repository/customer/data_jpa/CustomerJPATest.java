//package io.smsc.repository.customer.data_jpa;
//
//import static org.junit.Assert.*;
//
//import org.junit.After;
//import org.junit.Before;
//import org.junit.Test;
//
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//
////@WithMockUser(username="Admin", roles = {"ADMIN"})
//@RunWith(SpringJUnit4ClassRunner.class)
//@DataJpaTest
//public class CustomerJPATest {
//
//    @Autowired
//    private CustomerRepository customerRepository;
//
//    @PersistenceContext
//    private EntityManager em;
//
//    private Customer customer;
//
//    @Before
//    public void setUp() {
//        customer = new Customer();
//        customer.setCity("Lviv");
//        customer.setCompanyName("Freelancer");
//        customer.setCountry("Ukraine");
//        customer.setCustomerId(11.0);
//        customer.setPostcode("79005");
//        customer.setStreet("Voronogo 5/6");
//        customer.setStreet2("Svobody 1/3");
//        customer.setVatid(1.0);
//        this.em.persist(customer);
//    }
//
//    @After
//    public void tearDown() {
//        this.em.remove(customer);
//    }
//
//    @Test
//    public void testDeleteCustomer() throws Exception {
//        this.customerRepository.delete(customer);
//        assertEquals(null, customerRepository.findByCustomerId(11.0));
//    }
//
////    @Test
////    public void testSaveCustomer() throws Exception {
////        Customer newCustomer = new Customer(null,2.0,"newCompany","newStreet","newStreet2","79005", "Ukraine", "Lviv", 9999999.0);
////        Customer created = customerRepository.save(newCustomer);
////        newCustomer.setId(created.getId());
////         CUSTOMER_MODEL_MATCHER.assertEquals(newCustomer, customerRepository.getOne(newCustomer.getId()));
////    }
////
////    @Test
////    public void testGetSingleCustomer() throws Exception {
////        Customer customer = customerRepository.getOne(CUSTOMER_ID_1);
////        CUSTOMER_MODEL_MATCHER.assertEquals(CUSTOMER_1, customer);
////    }
////
////    @Test
////    public void testGetAllCustomers() throws Exception {
////        Collection<Customer> customers = customerRepository.findAll();
////        CUSTOMER_MODEL_MATCHER.assertCollectionEquals(Collections.singletonList(CUSTOMER_1), customers);
////    }
////
////    @Test
////    public void testUpdateCustomer() throws Exception{
////        Customer updated = customerRepository.findOne(240L);
////        updated.setCity("Monte-Carlo");
////        updated.setCompanyName("Monte-Carlo Automobile");
////        updated.setCountry("Monaco");
////        updated.setCustomerId(5.0);
////        customerRepository.save(updated);
////        CUSTOMER_MODEL_MATCHER.assertEquals(updated, customerRepository.findOne(CUSTOMER_ID_1));
////    }
////
////    @Test
////    public void testAddUser() throws Exception {
////        User newUser = new User(null,"Old Johnny","john123456","John","Forrester","john@gmail.com",true,false);
////        User created = userRepository.saveOneWithEncryptedPassword(newUser);
////        Customer customer = customerRepository.addUser(CUSTOMER_ID_1,created.getId());
////        CUSTOMER_MODEL_MATCHER.assertEquals(customer, customerRepository.getOne(CUSTOMER_ID_1));
////    }
////
////    @Test
////    public void testRemoveUser() throws Exception {
////        Customer customer = customerRepository.removeUser(CUSTOMER_ID_1,USER_ID);
////        CUSTOMER_MODEL_MATCHER.assertEquals(customer, customerRepository.getOne(CUSTOMER_ID_1));
////    }
////
////    @Test
////    public void testGetCustomerByCustomerId() throws Exception {
////        Customer customer = customerRepository.findByCustomerId(1.0);
////        CUSTOMER_MODEL_MATCHER.assertEquals(CUSTOMER_1, customer);
////    }
//}
