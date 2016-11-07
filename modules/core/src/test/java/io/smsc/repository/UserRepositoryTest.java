package io.smsc.repository;

import io.smsc.model.User;
import io.smsc.repository.user.UserRepository;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static io.smsc.UserTestData.*;

public class UserRepositoryTest extends AbstractRepositoryTest {

    @Autowired
    private UserRepository repository;

    @Test
    public void delete() throws Exception {
        repository.deleteById(USER_ID);
        USER_MODEL_MATCHER.assertCollectionEquals(Collections.singletonList(ADMIN),repository.findAll());
    }

    @Test
    public void save() throws Exception {
        User newUser = new User(null,"Old Johnny","john123456","John","Forrester","john@gmail.com",true,false);
        newUser.setRoles(Collections.emptyList());
        User created = repository.save(newUser);
        newUser.setId(created.getId());
        USER_MODEL_MATCHER.assertEquals(newUser,repository.findOne(newUser.getId()));
    }

    @Test
    public void get() throws Exception {
        User user = repository.findOne(USER_ID);
        USER_MODEL_MATCHER.assertEquals(USER,user);
//        Assert.assertEquals(USER.toString(),user.toString());
    }

    @Test
    public void getAll() throws Exception {
        Collection<User> users = repository.findAll();
        USER_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(USER, ADMIN), users);
    }

    @Test
    public void update() throws Exception{
        User updated = USER;
        updated.setActive(false);
        updated.setBlocked(true);
        updated.setEmail("bot@gmail.com");
        repository.save(updated);
        USER_MODEL_MATCHER.assertEquals(updated, repository.findOne(USER_ID));
    }

}