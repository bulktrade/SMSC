package io.smsc.repository.user;

import io.smsc.AbstractTest;
import io.smsc.model.User;
import org.junit.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.test.context.support.WithMockUser;

import javax.validation.ConstraintViolationException;
import java.util.Arrays;

import static io.smsc.test_data.UserTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class UserValidationTest extends AbstractTest {
//
//    @Test(expected = ConstraintViolationException.class)
//    public void testEmptyUserNameSave() throws Exception {
//        User newUser = new User(null,"","john123456","John","Forrester",
//                "john@gmail.com",true,false);
//        userRepository.saveOneWithEncryptedPassword(newUser);
//        userRepository.findAll();
//    }
//
//    @Test(expected = ConstraintViolationException.class)
//    public void testEmptyUserPasswordSave() throws Exception {
//        User newUser = new User(null,"Old Johnny","","John","Forrester",
//                "john@gmail.com",true,false);
//        userRepository.save(newUser);
//        userRepository.findAll();
//    }
//
//    @Test(expected = ConstraintViolationException.class)
//    public void testEmptyUserFirstNameSave() throws Exception {
//        User newUser = new User(null,"Old Johnny","john123456","","Forrester",
//                "john@gmail.com",true,false);
//        newUser.setSalt("24f9ed661baf5056");
//        userRepository.saveOneWithEncryptedPassword(newUser);
//        userRepository.findAll();
//    }
//
//    @Test(expected = ConstraintViolationException.class)
//    public void testEmptyUserSurNameSave() throws Exception {
//        User newUser = new User(null,"Old Johnny","john123456","John","",
//                "john@gmail.com",true,false);
//        userRepository.saveOneWithEncryptedPassword(newUser);
//        userRepository.findAll();
//    }
//
//    @Test(expected = ConstraintViolationException.class)
//    public void testEmptyUserEmailSave() throws Exception {
//        User newUser = new User(null,"Old Johnny","john123456","John",
//                "Forrester","",true,false);
//        userRepository.saveOneWithEncryptedPassword(newUser);
//        userRepository.findAll();
//    }
//
//    @Test(expected = ConstraintViolationException.class)
//    public void testInvalidUserEmailSave() throws Exception {
//        User newUser = new User(null,"Old Johnny","john123456","John",
//                "Forrester","invalid_email",true,false);
//        userRepository.saveOneWithEncryptedPassword(newUser);
//        userRepository.findAll();
//    }
//
//    @Test(expected = DataIntegrityViolationException.class)
//    public void testDuplicateUserNameMailSave() throws Exception {
//        User newUser = new User(USER);
//        newUser.setId(null);
//        userRepository.saveOneWithEncryptedPassword(newUser);
//        USER_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newUser, USER, ADMIN), userRepository.getAllWithRolesAndDecryptedPassword());
//    }
}
