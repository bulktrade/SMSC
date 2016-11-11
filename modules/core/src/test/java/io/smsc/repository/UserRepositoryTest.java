package io.smsc.repository;

import io.smsc.model.User;
import io.smsc.repository.user.UserRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static io.smsc.UserTestData.*;

public class UserRepositoryTest extends AbstractRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testDelete() throws Exception {
        userRepository.deleteById(USER_ID);
        USER_MODEL_MATCHER.assertCollectionEquals(Collections.singletonList(ADMIN), userRepository.findAll());
    }

    @Test
    public void testSave() throws Exception {
        User newUser = new User(null,"Old Johnny","john123456","John","Forrester","john@gmail.com",true,false);
        User created = userRepository.save(newUser);
        newUser.setId(created.getId());
        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.findOne(newUser.getId()));
    }

    @Test
    public void testGet() throws Exception {
        User user = userRepository.findOne(USER_ID);
        USER_MODEL_MATCHER.assertEquals(USER,user);
    }

    @Test
    public void testGetAll() throws Exception {
        Collection<User> users = userRepository.findAll();
        USER_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(USER, ADMIN), users);
    }

    @Test
    public void testUpdate() throws Exception{
        User updated = new User(USER);
        updated.setActive(false);
        updated.setBlocked(true);
        updated.setEmail("bot@gmail.com");
        userRepository.save(updated);
        USER_MODEL_MATCHER.assertEquals(updated, userRepository.findOne(USER_ID));
    }

    @Test
    public void testGetByEmail() throws Exception {
        User user = userRepository.findByEmail("admin@gmail.com");
        USER_MODEL_MATCHER.assertEquals(ADMIN, user);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void testDuplicateUsernameMailSave() throws Exception {
        User newUser = new User(USER);
        newUser.setId(null);
        userRepository.save(newUser);
        USER_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newUser,USER,ADMIN), userRepository.findAll());
    }

}