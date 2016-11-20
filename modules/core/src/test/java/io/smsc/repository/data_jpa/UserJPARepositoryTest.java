package io.smsc.repository.data_jpa;

import io.smsc.converters.CryptoConverter;
import io.smsc.model.User;
import io.smsc.repository.AbstractRepositoryTest;
import io.smsc.repository.user.UserRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static io.smsc.UserTestData.*;

public class UserJPARepositoryTest extends AbstractRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testDelete() throws Exception {
        userRepository.deleteById(USER_ID);
        USER_MODEL_MATCHER.assertCollectionEquals(Collections.singletonList(ADMIN), userRepository.getAllWithDecryptedPassword());
    }

    @Test
    public void testSave() throws Exception {
        User newUser = new User(null,"Old Johnny","john123456","John","Forrester","john@gmail.com",true,false);
        User created = userRepository.saveOneWithEncryptedPassword(newUser);
        newUser.setId(created.getId());
//        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
    }

    @Test
    public void testGet() throws Exception {
        User user = userRepository.getOneWithDecryptedPassword(USER_ID);
        USER_MODEL_MATCHER.assertEquals(USER,user);
    }

    @Test
    public void testGetAll() throws Exception {
        Collection<User> users = userRepository.getAllWithDecryptedPassword();
        USER_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(USER, ADMIN), users);
    }

    @Test
    public void testUpdate() throws Exception{
        User updated = new User(USER);
        updated.setActive(false);
        updated.setBlocked(true);
        updated.setEmail("bot@gmail.com");
        userRepository.saveOneWithEncryptedPassword(updated);
        CryptoConverter.decryptPassword(updated,secretKey);
        USER_MODEL_MATCHER.assertEquals(updated, userRepository.getOneWithDecryptedPassword(USER_ID));
    }

    @Test
    public void testGetByEmail() throws Exception {
        User user = userRepository.getOneByEmailWithDecryptedPassword("admin@gmail.com");
        USER_MODEL_MATCHER.assertEquals(ADMIN, user);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void testDuplicateUsernameMailSave() throws Exception {
        User newUser = new User(USER);
        newUser.setId(null);
        userRepository.saveOneWithEncryptedPassword(newUser);
        USER_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newUser,USER,ADMIN), userRepository.getAllWithDecryptedPassword());
    }

}