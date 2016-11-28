package io.smsc.repository.role;

import io.smsc.model.Role;
import io.smsc.repository.AbstractRepositoryTest;
import io.smsc.repository.role.RoleRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static io.smsc.test_data.RoleTestData.*;

public class RoleJPARepositoryTest extends AbstractRepositoryTest {

    @Autowired
    private RoleRepository roleRepository;

    @Test
    public void testDeleteRole() throws Exception {
        roleRepository.deleteById(ROLE_USER_ID);
        ROLE_MODEL_MATCHER.assertCollectionEquals(Collections.singletonList(ROLE_ADMIN), roleRepository.findAll());
    }

    @Test
    public void testSaveRole() throws Exception {
        Role newRole = new Role(null,"ROLE_GOD");
        Role created = roleRepository.save(newRole);
        newRole.setId(created.getId());
        ROLE_MODEL_MATCHER.assertEquals(newRole, roleRepository.findOne(newRole.getId()));
    }

    @Test
    public void testGetSingleRole() throws Exception {
        Role role = roleRepository.findOne(ROLE_USER_ID);
        ROLE_MODEL_MATCHER.assertEquals(ROLE_USER,role);
    }

    @Test
    public void testGetAllRoles() throws Exception {
        Collection<Role> roles = roleRepository.findAll();
        ROLE_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(ROLE_USER, ROLE_ADMIN), roles);
    }

    @Test
    public void testUpdateRole() throws Exception {
        Role updated = new Role(ROLE_USER);
        updated.setName("ROLE_GUEST");
        roleRepository.save(updated);
        ROLE_MODEL_MATCHER.assertEquals(updated, roleRepository.findOne(ROLE_USER_ID));
    }


    @Test(expected = DataIntegrityViolationException.class)
    public void testDuplicateRoleNameSave() throws Exception {
        Role newRole = new Role(ROLE_USER);
        newRole.setId(null);
        roleRepository.save(newRole);
        ROLE_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newRole,ROLE_USER,ROLE_ADMIN), roleRepository.findAll());
    }

}