package io.smsc.repository.role;

import io.smsc.model.Role;
import io.smsc.AbstractTest;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static io.smsc.test_data.RoleTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class RoleJPATest extends AbstractTest {

//    @Test
//    public void testDeleteRole() throws Exception {
//        roleRepository.delete(ROLE_USER_ID);
//        ROLE_MODEL_MATCHER.assertCollectionEquals(Collections.singletonList(ROLE_ADMIN), roleRepository.findAll());
//    }
//
//    @Test
//    public void testSaveRole() throws Exception {
//        Role newRole = new Role(null,"GOD");
//        Role created = roleRepository.save(newRole);
//        newRole.setId(created.getId());
//        ROLE_MODEL_MATCHER.assertEquals(newRole, roleRepository.findOne(newRole.getId()));
//    }
//
//    @Test
//    public void testGetSingleRole() throws Exception {
//        Role role = roleRepository.findOne(ROLE_USER_ID);
//        ROLE_MODEL_MATCHER.assertEquals(ROLE_USER,role);
//    }
//
//    @Test
//    public void testGetAllRoles() throws Exception {
//        Collection<Role> roles = roleRepository.findAll();
//        ROLE_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(ROLE_USER, ROLE_ADMIN), roles);
//    }
//
//    @Test
//    public void testUpdateRole() throws Exception {
//        Role updated = roleRepository.findOne(51L);
//        updated.setName("GUEST");
//        roleRepository.save(updated);
//        ROLE_MODEL_MATCHER.assertEquals(updated, roleRepository.findOne(ROLE_USER_ID));
//    }

}