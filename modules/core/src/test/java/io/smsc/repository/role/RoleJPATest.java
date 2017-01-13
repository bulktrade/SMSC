package io.smsc.repository.role;

import io.smsc.model.Role;
import io.smsc.AbstractTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static io.smsc.test_data.RoleTestData.*;
import static io.smsc.test_data.PermissionTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class RoleJPATest extends AbstractTest {

    @Test
    public void testDeleteRole() throws Exception {
        roleRepository.delete(ROLE_USER_ID);
        ROLE_MODEL_MATCHER.assertCollectionEquals(Collections.singletonList(ROLE_ADMIN), roleRepository.findAll());
    }

    @Test
    public void testSaveRole() throws Exception {
        Role newRole = new Role(null,"GOD");
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
        updated.setName("GUEST");
        roleRepository.save(updated);
        ROLE_MODEL_MATCHER.assertEquals(updated, roleRepository.findOne(ROLE_USER_ID));
    }

    @Test
    public void testAddPermission() throws Exception {
        Role role = roleRepository.addPermission(ROLE_USER_ID,PERMISSION_USER_CREATE_ID);
        ROLE_MODEL_MATCHER.assertEquals(role,roleRepository.findOne(ROLE_USER_ID));
    }

    @Test
    public void testRemovePermission() throws Exception {
        Role role = roleRepository.removePermission(ROLE_USER_ID,PERMISSION_USER_READ_OWN_ID);
        ROLE_MODEL_MATCHER.assertEquals(role,roleRepository.findOne(ROLE_USER_ID));
    }

}