//package io.smsc.repository.customer.data_jpa;
//
//import io.smsc.AbstractTest;
//import io.smsc.model.customer.CustomerContact;
//import io.smsc.model.customer.Salutation;
//import io.smsc.model.customer.Type;
//import org.junit.Test;
//import org.springframework.dao.DataIntegrityViolationException;
//import org.springframework.security.test.context.support.WithMockUser;
//
//import java.util.Arrays;
//import java.util.Collection;
//import java.util.Collections;
//
//import static io.smsc.test_data.CustomerContactTestData.*;
//
//@WithMockUser(username="Admin",roles = {"ADMIN"})
//public class CustomerContactJPATest extends AbstractTest {
//
////    @Test
////    public void testDeleteCustomerContact() throws Exception {
////        customerContactRepository.delete(CUSTOMER_CONTACT_ID_1);
////        CUSTOMER_CONTACT_MODEL_MATCHER.assertCollectionEquals(Collections.emptyList(), customerContactRepository.findAll());
////    }
////
////    @Test
////    public void testSaveCustomerContact() throws Exception {
////        CustomerContact newContact = new CustomerContact(null, "newName", "newSurname", "0322222222", "0632222222", "new_fake_fax", "fake@gmail.com", Type.TECHNICAL, Salutation.MRS);
////        CustomerContact created =customerContactRepository.save(newContact);
////        newContact.setId(created.getId());
////        CUSTOMER_CONTACT_MODEL_MATCHER.assertEquals(newContact, customerContactRepository.getOne(newContact.getId()));
////    }
////
////    @Test
////    public void testGetSingleCustomer() throws Exception {
////        CustomerContact contact = customerContactRepository.findOne(CUSTOMER_CONTACT_ID_1);
////        CUSTOMER_CONTACT_MODEL_MATCHER.assertEquals(CUSTOMER_CONTACT_1,contact);
////    }
////
////    @Test
////    public void testGetAllCustomerContacts() throws Exception {
////        Collection<CustomerContact> customerContacts = customerContactRepository.findAll();
////        CUSTOMER_CONTACT_MODEL_MATCHER.assertCollectionEquals(Collections.singletonList(CUSTOMER_CONTACT_1), customerContacts);
////    }
////
////    @Test
////    public void testUpdateCustomerContact() throws Exception {
////        CustomerContact updated = customerContactRepository.findOne(241L);
////        updated.setType(Type.PRIMARY);
////        updated.setEmailAddress("new_email@gmial.com");
////        updated.setMobilePhone("0971234567");
////        updated.setFirstname("newFirstName");
////        customerContactRepository.save(updated);
////        CUSTOMER_CONTACT_MODEL_MATCHER.assertEquals(updated, customerContactRepository.getOne(CUSTOMER_CONTACT_ID_1));
////    }
////
////    @Test
////    public void testGetCustomerByEmailAddress() throws Exception {
////        CustomerContact contact = customerContactRepository.findByEmailAddress("smsc@bulk.io");
////        CUSTOMER_CONTACT_MODEL_MATCHER.assertEquals(CUSTOMER_CONTACT_1,contact);
////    }
//}
