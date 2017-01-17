package io.smsc.repository.permission;

import io.smsc.AbstractTest;
import io.smsc.model.Permission;
import org.junit.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.test.context.support.WithMockUser;

import javax.validation.ConstraintViolationException;
import java.util.Arrays;

import static io.smsc.test_data.PermissionTestData.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class PermissionValidationTest extends AbstractTest {

    @Test(expected = ConstraintViolationException.class)
    public void testInvalidPermissionNameSave() throws Exception {
        Permission newPermission = new Permission(null,"wrong_name_permission");
        permissionRepository.save(newPermission);
        permissionRepository.findAll();

    }

    @Test(expected = ConstraintViolationException.class)
    public void testEmptyPermissionNameSave() throws Exception {
        Permission newPermission = new Permission(null,"");
        permissionRepository.save(newPermission);
        permissionRepository.findAll();
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void testDuplicatePermissionNameSave() throws Exception {
        Permission newPermission = new Permission(PERMISSION_USER_DELETE);
        newPermission.setId(null);
        permissionRepository.save(newPermission);
        PERMISSION_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newPermission, PERMISSION_USER_READ, PERMISSION_USER_UPDATE,
                PERMISSION_USER_CREATE, PERMISSION_USER_DELETE, PERMISSION_USER_READ_OWN, PERMISSION_USER_UPDATE_OWN,
                PERMISSION_ROLE_READ, PERMISSION_ROLE_UPDATE, PERMISSION_ROLE_CREATE, PERMISSION_ROLE_DELETE, PERMISSION_PERMISSION_READ,
                PERMISSION_PERMISSION_UPDATE, PERMISSION_PERMISSION_CREATE, PERMISSION_PERMISSION_DELETE, PERMISSION_CRUD_CLASS_META_DATA_READ,
                PERMISSION_CRUD_CLASS_META_DATA_UPDATE, PERMISSION_CRUD_CLASS_META_DATA_CREATE, PERMISSION_CRUD_CLASS_META_DATA_DELETE,
                PERMISSION_CRUD_META_FORM_DATA_READ, PERMISSION_CRUD_META_FORM_DATA_UPDATE, PERMISSION_CRUD_META_FORM_DATA_CREATE,
                PERMISSION_CRUD_META_FORM_DATA_DELETE, PERMISSION_CRUD_META_GRID_DATA_READ, PERMISSION_CRUD_META_GRID_DATA_UPDATE,
                PERMISSION_CRUD_META_GRID_DATA_CREATE, PERMISSION_CRUD_META_GRID_DATA_DELETE, PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_READ,
                PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_UPDATE, PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_CREATE,
                PERMISSION_META_DATA_PROPERTY_BINDING_PARAMETER_DELETE, PERMISSION_CUSTOMER_READ, PERMISSION_CUSTOMER_UPDATE,
                PERMISSION_CUSTOMER_CREATE, PERMISSION_CUSTOMER_DELETE, PERMISSION_CUSTOMER_CONTACT_READ, PERMISSION_CUSTOMER_CONTACT_UPDATE,
                PERMISSION_CUSTOMER_CONTACT_CREATE, PERMISSION_CUSTOMER_CONTACT_DELETE, PERMISSION_DASHBOARD_READ,
                PERMISSION_DASHBOARD_UPDATE, PERMISSION_DASHBOARD_CREATE, PERMISSION_DASHBOARD_DELETE, PERMISSION_DASHBOARD_BOX_READ,
                PERMISSION_DASHBOARD_BOX_UPDATE, PERMISSION_DASHBOARD_BOX_CREATE, PERMISSION_DASHBOARD_BOX_DELETE,
                PERMISSION_DASHBOARD_BOX_TYPE_READ, PERMISSION_DASHBOARD_BOX_TYPE_UPDATE, PERMISSION_DASHBOARD_BOX_TYPE_CREATE,
                PERMISSION_DASHBOARD_BOX_TYPE_DELETE), permissionRepository.findAll());
    }
}
