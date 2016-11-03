package io.smsc.rest.repository;

import io.smsc.model.Role;
import io.smsc.rest.repository.role.RoleRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static io.smsc.RoleTestData.*;


public class RoleRepositoryTest extends AbstractRepositoryTest {

    @Autowired
    private RoleRepository repository;

    @Test
    public void delete() throws Exception {
        repository.deleteById(ROLE_USER_ID);
        ROLE_MODEL_MATCHER.assertCollectionEquals(Collections.singletonList(ROLE_ADMIN),repository.findAll());
    }

    @Test
    public void save() throws Exception {
        Role newRole = new Role(null,"ROLE_GOD");
        Role created = repository.save(newRole);
        newRole.setId(created.getId());
        ROLE_MODEL_MATCHER.assertEquals(newRole,repository.findOne(newRole.getId()));
    }

    @Test
    public void get() throws Exception {
        Role permission = repository.findOne(ROLE_USER_ID);
        ROLE_MODEL_MATCHER.assertEquals(ROLE_USER,permission);
    }

    @Test
    public void getAll() throws Exception {
        Collection<Role> permissions = repository.findAll();
        ROLE_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(ROLE_USER, ROLE_ADMIN), permissions);
    }

    @Test
    public void update() throws Exception{
        Role updated = ROLE_USER;
        updated.setName("ROLE_GUEST");
        repository.save(updated);
        ROLE_MODEL_MATCHER.assertEquals(updated, repository.findOne(ROLE_USER_ID));
    }

}