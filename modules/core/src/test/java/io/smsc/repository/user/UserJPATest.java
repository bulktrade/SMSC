package io.smsc.repository.user;

import io.smsc.converters.CryptoConverter;
import io.smsc.model.User;
import io.smsc.AbstractTest;
import org.junit.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static io.smsc.test_data.RoleTestData.*;
import static io.smsc.test_data.UserTestData.*;
import static io.smsc.test_data.DashboardTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class UserJPATest extends AbstractTest {

    @Test
    public void testDeleteUser() throws Exception {
        userRepository.delete(USER_ID);
        USER_MODEL_MATCHER.assertCollectionEquals(Collections.singletonList(ADMIN), userRepository.getAllWithRolesAndDecryptedPassword());
    }

    @Test
    public void testSaveUser() throws Exception {
        User newUser = new User(null,"Old Johnny","john123456","John","Forrester","john@gmail.com",true,false);
        User created = userRepository.saveOneWithEncryptedPassword(newUser);
        newUser.setId(created.getId());
        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
    }

    @Test
    public void testGetSingleUser() throws Exception {
        User user = userRepository.getOneWithDecryptedPassword(USER_ID);
        USER_MODEL_MATCHER.assertEquals(USER,user);
    }

    @Test
    public void testGetAllUsers() throws Exception {
        Collection<User> users = userRepository.getAllWithRolesAndDecryptedPassword();
        USER_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(USER, ADMIN), users);
    }

    @Test
    public void testUpdateUser() throws Exception{
        User updated = new User(USER);
        updated.setActive(false);
        updated.setBlocked(true);
        updated.setEmail("bot@gmail.com");
        userRepository.saveOneWithEncryptedPassword(updated);
        CryptoConverter.decrypt(updated,secretKey);
        USER_MODEL_MATCHER.assertEquals(updated, userRepository.getOneWithDecryptedPassword(USER_ID));
    }

    @Test
    public void testGetUserByEmail() throws Exception {
        User user = userRepository.getOneByEmailWithDecryptedPassword("admin@gmail.com");
        USER_MODEL_MATCHER.assertEquals(ADMIN, user);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void testDuplicateUserNameMailSave() throws Exception {
        User newUser = new User(USER);
        newUser.setId(null);
        userRepository.saveOneWithEncryptedPassword(newUser);
        USER_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newUser,USER,ADMIN), userRepository.getAllWithRolesAndDecryptedPassword());
    }

    @Test
    public void testAddRole() throws Exception {
        User user = userRepository.addRole(USER_ID,ROLE_ADMIN_ID);
        USER_MODEL_MATCHER.assertEquals(user, userRepository.getOneWithDecryptedPassword(USER_ID));
    }

    @Test
    public void testRemoveRole() throws Exception {
        User user = userRepository.removeRole(USER_ID,ROLE_USER_ID);
        USER_MODEL_MATCHER.assertEquals(user, userRepository.getOneWithDecryptedPassword(USER_ID));
    }

    @Test
    public void testAddDashboard() throws Exception {
        User user = userRepository.addDashboard(USER_ID, "new dashboard", "new icon");
        USER_MODEL_MATCHER.assertEquals(user, userRepository.getOneWithDecryptedPassword(USER_ID));
    }

    @Test
    public void testRemoveDashboard() throws Exception {
        User user = userRepository.removeDashboard(USER_ID, DASHBOARD_ID_1);
        USER_MODEL_MATCHER.assertEquals(user, userRepository.getOneWithDecryptedPassword(USER_ID));
    }
}