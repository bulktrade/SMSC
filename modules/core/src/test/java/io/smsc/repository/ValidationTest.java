package io.smsc.repository;

import io.smsc.AbstractTest;
import io.smsc.Application;
import io.smsc.config.SecurityConfig;
import io.smsc.model.Permission;
import io.smsc.model.Role;
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

import javax.validation.ConstraintViolationException;
import java.util.Arrays;

import static io.smsc.test_data.PermissionTestData.*;
import static io.smsc.test_data.RoleTestData.*;

public class ValidationTest extends AbstractTest {

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Test(expected = ConstraintViolationException.class)
    public void testInvalidRoleNameSave() throws Exception {
        Role newRole = new Role(null,"wrong_name_role");
        Role created = roleRepository.save(newRole);
        newRole.setId(created.getId());
        ROLE_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newRole,ROLE_USER,ROLE_ADMIN), roleRepository.findAll());
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyRoleNameSave() throws Exception {
        Role newRole = new Role(null,"");
        Role created = roleRepository.save(newRole);
        newRole.setId(created.getId());
        ROLE_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newRole,ROLE_USER,ROLE_ADMIN), roleRepository.findAll());
    }

    @Test(expected = ConstraintViolationException.class)
    public void testInvalidPermissionNameSave() throws Exception {
        Permission newPermission = new Permission(null,"wrong_name_permission");
        Permission created = permissionRepository.save(newPermission);
        newPermission.setId(created.getId());
        PERMISSION_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newPermission,PERMISSION_USER_READ,PERMISSION_USER_UPDATE,
                PERMISSION_USER_CREATE,PERMISSION_USER_DELETE,PERMISSION_USER_READ_OWN,PERMISSION_USER_UPDATE_OWN,
                PERMISSION_ROLE_READ,PERMISSION_ROLE_UPDATE,PERMISSION_ROLE_CREATE,PERMISSION_ROLE_DELETE,PERMISSION_PERMISSION_READ,
                PERMISSION_PERMISSION_UPDATE,PERMISSION_PERMISSION_CREATE,PERMISSION_PERMISSION_DELETE,PERMISSION_CRUD_CLASS_META_DATA_READ,
                PERMISSION_CRUD_CLASS_META_DATA_UPDATE,PERMISSION_CRUD_CLASS_META_DATA_CREATE,PERMISSION_CRUD_CLASS_META_DATA_DELETE,
                PERMISSION_CRUD_META_FORM_DATA_READ,PERMISSION_CRUD_META_FORM_DATA_UPDATE,PERMISSION_CRUD_META_FORM_DATA_CREATE,
                PERMISSION_CRUD_META_FORM_DATA_DELETE,PERMISSION_CRUD_META_GRID_DATA_READ,PERMISSION_CRUD_META_GRID_DATA_UPDATE,
                PERMISSION_CRUD_META_GRID_DATA_CREATE,PERMISSION_CRUD_META_GRID_DATA_DELETE,PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_READ,
                PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_UPDATE,PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_CREATE,
                PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_DELETE),
                permissionRepository.findAll());
    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyPermissionNameSave() throws Exception {
        Permission newPermission = new Permission(null,"");
        Permission created = permissionRepository.save(newPermission);
        newPermission.setId(created.getId());
        PERMISSION_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newPermission,PERMISSION_USER_READ,PERMISSION_USER_UPDATE,
                PERMISSION_USER_CREATE,PERMISSION_USER_DELETE,PERMISSION_USER_READ_OWN,PERMISSION_USER_UPDATE_OWN,
                PERMISSION_ROLE_READ,PERMISSION_ROLE_UPDATE,PERMISSION_ROLE_CREATE,PERMISSION_ROLE_DELETE,PERMISSION_PERMISSION_READ,
                PERMISSION_PERMISSION_UPDATE,PERMISSION_PERMISSION_CREATE,PERMISSION_PERMISSION_DELETE,PERMISSION_CRUD_CLASS_META_DATA_READ,
                PERMISSION_CRUD_CLASS_META_DATA_UPDATE,PERMISSION_CRUD_CLASS_META_DATA_CREATE,PERMISSION_CRUD_CLASS_META_DATA_DELETE,
                PERMISSION_CRUD_META_FORM_DATA_READ,PERMISSION_CRUD_META_FORM_DATA_UPDATE,PERMISSION_CRUD_META_FORM_DATA_CREATE,
                PERMISSION_CRUD_META_FORM_DATA_DELETE,PERMISSION_CRUD_META_GRID_DATA_READ,PERMISSION_CRUD_META_GRID_DATA_UPDATE,
                PERMISSION_CRUD_META_GRID_DATA_CREATE,PERMISSION_CRUD_META_GRID_DATA_DELETE,PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_READ,
                PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_UPDATE,PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_CREATE,
                PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_DELETE),
                permissionRepository.findAll());
    }

//    @Test(expected = TransactionSystemException.class)
//    public void testEmptyUserNameSave() throws Exception {
//        User newUser = new User(null,"","john123456","John","Forrester","john@gmail.com",true,false);
//        User created = userRepository.saveOneWithEncryptedPassword(newUser);
//        newUser.setId(created.getId());
//        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
//    }
//
//    @Test(expected = TransactionSystemException.class)
//    public void testEmptyUserPasswordSave() throws Exception {
//        User newUser = new User(null,"Old Johnny","","John","Forrester","john@gmail.com",true,false);
//        User created = userRepository.saveOneWithEncryptedPassword(newUser);
//        newUser.setId(created.getId());
//        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
//    }
//
//    @Test(expected = TransactionSystemException.class)
//    public void testEmptyUserFirstNameSave() throws Exception {
//        User newUser = new User(null,"Old Johnny","john123456","","Forrester","john@gmail.com",true,false);
//        newUser.setSalt("24f9ed661baf5056");
//        User created = userRepository.saveOneWithEncryptedPassword(newUser);
//        newUser.setId(created.getId());
//        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
//    }
//
//    @Test(expected = TransactionSystemException.class)
//    public void testEmptyUserSurNameSave() throws Exception {
//        User newUser = new User(null,"Old Johnny","john123456","John","","john@gmail.com",true,false);
//        User created = userRepository.saveOneWithEncryptedPassword(newUser);
//        newUser.setId(created.getId());
//        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
//    }
//
//    @Test(expected = TransactionSystemException.class)
//    public void testEmptyUserEmailSave() throws Exception {
//        User newUser = new User(null,"Old Johnny","john123456","John","Forrester","",true,false);
//        User created = userRepository.saveOneWithEncryptedPassword(newUser);
//        newUser.setId(created.getId());
//        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
//    }
//
//    @Test(expected = TransactionSystemException.class)
//    public void testInvalidUserEmailSave() throws Exception {
//        User newUser = new User(null,"Old Johnny","john123456","John","Forrester","invalid_email",true,false);
//        User created = userRepository.saveOneWithEncryptedPassword(newUser);
//        newUser.setId(created.getId());
//        USER_MODEL_MATCHER.assertEquals(newUser, userRepository.getOneWithDecryptedPassword(newUser.getId()));
//    }
}
