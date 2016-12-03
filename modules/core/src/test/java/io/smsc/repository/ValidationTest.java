package io.smsc.repository;

import io.smsc.Application;
import io.smsc.config.SecurityConfig;
import io.smsc.model.Permission;
import io.smsc.model.Role;
import io.smsc.model.User;
import io.smsc.repository.permission.PermissionRepository;
import io.smsc.repository.role.RoleRepository;
import io.smsc.repository.user.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ConstraintViolationException;
import java.util.Arrays;

import static io.smsc.test_data.PermissionTestData.*;
import static io.smsc.test_data.RoleTestData.*;
import static io.smsc.test_data.UserTestData.*;

@ContextConfiguration(classes = {Application.class, SecurityConfig.class})
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@TestPropertySource(properties = {"smsc.database = hsqldb"})
public class ValidationTest {

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Test(expected = ConstraintViolationException.class)
    @Transactional
    public void testInvalidRoleNameSave() throws Exception {
        Role newRole = new Role(null,"wrong_name_role");
        Role created = roleRepository.save(newRole);
        newRole.setId(created.getId());
        ROLE_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newRole,ROLE_USER,ROLE_ADMIN), roleRepository.findAll());
    }

    @Test(expected = ConstraintViolationException.class)
    @Transactional
    public void testEmptyRoleNameSave() throws Exception {
        Role newRole = new Role(null,"");
        Role created = roleRepository.save(newRole);
        newRole.setId(created.getId());
        ROLE_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newRole,ROLE_USER,ROLE_ADMIN), roleRepository.findAll());
    }

    @Test(expected = ConstraintViolationException.class)
    @Transactional
    public void testInvalidPermissionNameSave() throws Exception {
        Permission newPermission = new Permission(null,"wrong_name_permission");
        Permission created = permissionRepository.save(newPermission);
        newPermission.setId(created.getId());
        PERMISSION_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newPermission,PERMISSION_READ_USER,PERMISSION_UPDATE_USER,
                PERMISSION_CREATE_USER,PERMISSION_DELETE_USER,PERMISSION_READ_OWN_USER,PERMISSION_UPDATE_OWN_USER),
                permissionRepository.findAll());
    }

    @Test(expected = ConstraintViolationException.class)
    @Transactional
    public void testEmptyPermissionNameSave() throws Exception {
        Permission newPermission = new Permission(null,"");
        Permission created = permissionRepository.save(newPermission);
        newPermission.setId(created.getId());
        PERMISSION_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newPermission,PERMISSION_READ_USER,PERMISSION_UPDATE_USER,
                PERMISSION_CREATE_USER,PERMISSION_DELETE_USER,PERMISSION_READ_OWN_USER,PERMISSION_UPDATE_OWN_USER),
                permissionRepository.findAll());
    }

    @Test(expected = TransactionSystemException.class)
    public void testEmptyUserNameSave() throws Exception {
        User newUser = new User(null,"","john123456","John","Forrester","john@gmail.com",true,false);
        User created = userRepository.saveOneWithEncryptedPassword(newUser);
        newUser.setId(created.getId());
        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
    }

    @Test(expected = TransactionSystemException.class)
    public void testEmptyUserPasswordSave() throws Exception {
        User newUser = new User(null,"Old Johnny","","John","Forrester","john@gmail.com",true,false);
        User created = userRepository.save(newUser);
        newUser.setId(created.getId());
        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
    }

    @Test(expected = TransactionSystemException.class)
    public void testEmptyUserFirstNameSave() throws Exception {
        User newUser = new User(null,"Old Johnny","john123456","","Forrester","john@gmail.com",true,false);
        newUser.setSalt("24f9ed661baf5056");
        User created = userRepository.saveOneWithEncryptedPassword(newUser);
        newUser.setId(created.getId());
        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
    }

    @Test(expected = TransactionSystemException.class)
    public void testEmptyUserSurNameSave() throws Exception {
        User newUser = new User(null,"Old Johnny","john123456","John","","john@gmail.com",true,false);
        User created = userRepository.saveOneWithEncryptedPassword(newUser);
        newUser.setId(created.getId());
        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
    }

    @Test(expected = TransactionSystemException.class)
    public void testEmptyUserEmailSave() throws Exception {
        User newUser = new User(null,"Old Johnny","john123456","John","Forrester","",true,false);
        User created = userRepository.saveOneWithEncryptedPassword(newUser);
        newUser.setId(created.getId());
        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
    }

    @Test(expected = TransactionSystemException.class)
    public void testInvalidUserEmailSave() throws Exception {
        User newUser = new User(null,"Old Johnny","john123456","John","Forrester","invalid_email",true,false);
        User created = userRepository.saveOneWithEncryptedPassword(newUser);
        newUser.setId(created.getId());
        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
    }
}
