package io.smsc.rest.repository;

import io.smsc.model.User;
import io.smsc.rest.repository.user.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlConfig;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static io.smsc.UserTestData.*;

@ContextConfiguration("classpath:spring/spring-db.xml")
@RunWith(SpringJUnit4ClassRunner.class)
@ActiveProfiles("postgres")
@Sql(scripts = "classpath:db/populateDB.sql", config = @SqlConfig(encoding = "UTF-8"))
public class UserRepositoryTest {

    @Autowired
    private UserRepository repository;

    @Test
    public void delete() throws Exception {
        repository.deleteById(USER_ID);
        USER_MODEL_MATCHER.assertCollectionEquals(Collections.singletonList(ADMIN),repository.findAll());
    }

    @Test
    public void save() throws Exception {
        User newRole = new User(null,"Old Johnny","john123456","John","Forrester","john@gmail.com",true,false);
        User created = repository.save(newRole);
        newRole.setId(created.getId());
        USER_MODEL_MATCHER.assertEquals(newRole,repository.findOne(newRole.getId()));
    }

    @Test
    public void get() throws Exception {
        User user = repository.findOne(USER_ID);
        USER_MODEL_MATCHER.assertEquals(USER,user);
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