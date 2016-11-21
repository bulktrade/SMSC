package io.smsc.repository;

import io.smsc.model.Permission;
import io.smsc.model.Role;
import io.smsc.model.User;
import io.smsc.repository.permission.PermissionRepository;
import io.smsc.repository.role.RoleRepository;
import io.smsc.repository.user.UserRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintViolationException;
import java.util.Arrays;

import static io.smsc.PermissionTestData.*;
import static io.smsc.RoleTestData.*;
import static io.smsc.UserTestData.*;

public class ValidationTest extends AbstractRepositoryTest {

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

//        @Test(expected = ConstraintViolationException.class)
    @Test
    public void testInvalidRoleNameSave() throws Exception {
        Role newRole = new Role(null,"wrong_name_role");
        Role created = roleRepository.save(newRole);
        newRole.setId(created.getId());
        ROLE_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newRole,ROLE_USER,ROLE_ADMIN), roleRepository.findAll());
    }

    //    @Test(expected = ConstraintViolationException.class)
    @Test
    public void testEmptyRoleNameSave() throws Exception {
        Role newRole = new Role(null,"");
        Role created = roleRepository.save(newRole);
        newRole.setId(created.getId());
        ROLE_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newRole,ROLE_USER,ROLE_ADMIN), roleRepository.findAll());
    }

    //    @Test(expected = ConstraintViolationException.class)
    @Test
    public void testInvalidPermissionNameSave() throws Exception {
        Permission newPermission = new Permission(null,"wrong_name_permission");
        Permission created = permissionRepository.save(newPermission);
        newPermission.setId(created.getId());
        PERMISSION_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newPermission,PERMISSION_READ_USER,PERMISSION_UPDATE_USER,
                PERMISSION_CREATE_USER,PERMISSION_DELETE_USER,PERMISSION_READ_OWN_USER,PERMISSION_UPDATE_OWN_USER),
                permissionRepository.findAll());
    }

    //    @Test(expected = ConstraintViolationException.class)
    @Test
    public void testEmptyPermissionNameSave() throws Exception {
        Permission newPermission = new Permission(null,"");
        Permission created = permissionRepository.save(newPermission);
        newPermission.setId(created.getId());
        PERMISSION_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newPermission,PERMISSION_READ_USER,PERMISSION_UPDATE_USER,
                PERMISSION_CREATE_USER,PERMISSION_DELETE_USER,PERMISSION_READ_OWN_USER,PERMISSION_UPDATE_OWN_USER),
                permissionRepository.findAll());
    }

    //    @Test(expected = ConstraintViolationException.class)
    @Test
    public void testEmptyUserNameSave() throws Exception {
        User newUser = new User(null,"","john123456","John","Forrester","john@gmail.com",true,false);
        User created = userRepository.saveOneWithEncryptedPassword(newUser);
        newUser.setId(created.getId());
        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
    }

    //    @Test(expected = ConstraintViolationException.class)
    @Test
    public void testEmptyUserPasswordSave() throws Exception {
        User newUser = new User(null,"Old Johnny","","John","Forrester","john@gmail.com",true,false);
        User created = userRepository.saveOneWithEncryptedPassword(newUser);
        newUser.setId(created.getId());
        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
    }

    //    @Test(expected = ConstraintViolationException.class)
    @Test
    public void testEmptyUserFirstNameSave() throws Exception {
        User newUser = new User(null,"Old Johnny","john123456","","Forrester","john@gmail.com",true,false);
        User created = userRepository.saveOneWithEncryptedPassword(newUser);
        newUser.setId(created.getId());
        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
    }

    //    @Test(expected = ConstraintViolationException.class)
    @Test
    public void testEmptyUserSurNameSave() throws Exception {
        User newUser = new User(null,"Old Johnny","john123456","John","","john@gmail.com",true,false);
        User created = userRepository.saveOneWithEncryptedPassword(newUser);
        newUser.setId(created.getId());
        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
    }

    //    @Test(expected = ConstraintViolationException.class)
    @Test
    public void testEmptyUserEmailSave() throws Exception {
        User newUser = new User(null,"Old Johnny","john123456","John","Forrester","",true,false);
        User created = userRepository.saveOneWithEncryptedPassword(newUser);
        newUser.setId(created.getId());
        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
    }

    //    @Test(expected = ConstraintViolationException.class)
    @Test
    public void testInvalidUserEmailSave() throws Exception {
        User newUser = new User(null,"Old Johnny","john123456","John","Forrester","invalid_email",true,false);
        User created = userRepository.saveOneWithEncryptedPassword(newUser);
        newUser.setId(created.getId());
        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
    }




}
