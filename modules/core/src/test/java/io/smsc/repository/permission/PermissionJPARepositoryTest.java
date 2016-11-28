package io.smsc.repository.permission;

import io.smsc.model.Permission;
import io.smsc.repository.AbstractRepositoryTest;
import io.smsc.repository.permission.PermissionRepository;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.dao.DataIntegrityViolationException;

import java.util.Arrays;
import java.util.Collection;

import static io.smsc.test_data.PermissionTestData.*;

public class PermissionJPARepositoryTest extends AbstractRepositoryTest {

    @Autowired
    private PermissionRepository permissionRepository;

    @Test
    public void testDeletePermission() throws Exception {
        permissionRepository.deleteById(PERMISSION_DELETE_USER_ID);
        PERMISSION_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(PERMISSION_READ_USER,PERMISSION_UPDATE_USER,
                PERMISSION_CREATE_USER,PERMISSION_READ_OWN_USER,PERMISSION_UPDATE_OWN_USER),permissionRepository.findAll());
    }

    @Test
    public void testSavePermission() throws Exception {
        Permission newPermission = new Permission(null,"PERMISSION_UNLIMITED");
        Permission created = permissionRepository.save(newPermission);
        newPermission.setId(created.getId());
        PERMISSION_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(PERMISSION_READ_USER,PERMISSION_UPDATE_USER,
                PERMISSION_CREATE_USER,PERMISSION_DELETE_USER,PERMISSION_READ_OWN_USER,PERMISSION_UPDATE_OWN_USER,newPermission),
                permissionRepository.findAll());
    }

    @Test
    public void testGetSinglePermission() throws Exception {
        Permission permission = permissionRepository.findOne(PERMISSION_DELETE_USER_ID);
        PERMISSION_MODEL_MATCHER.assertEquals(PERMISSION_DELETE_USER,permission);
    }

    @Test
    public void testGetAllPermissions() throws Exception {
        Collection<Permission> permissions = permissionRepository.findAll();
        PERMISSION_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(PERMISSION_READ_USER,PERMISSION_UPDATE_USER,
                PERMISSION_CREATE_USER,PERMISSION_DELETE_USER,PERMISSION_READ_OWN_USER,PERMISSION_UPDATE_OWN_USER),permissions);
    }

    @Test
    public void testUpdatePermission() throws Exception {
        Permission updated = new Permission(PERMISSION_DELETE_USER);
        updated.setName("WITHOUT_ACCESS");
        permissionRepository.save(updated);
        PERMISSION_MODEL_MATCHER.assertEquals(updated, permissionRepository.findOne(PERMISSION_DELETE_USER_ID));
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void testDuplicatePermissionNameSave() throws Exception {
        Permission newPermission = new Permission(PERMISSION_DELETE_USER);
        newPermission.setId(null);
        permissionRepository.save(newPermission);
        PERMISSION_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(PERMISSION_READ_USER,PERMISSION_UPDATE_USER,
                PERMISSION_CREATE_USER,PERMISSION_DELETE_USER,PERMISSION_READ_OWN_USER,PERMISSION_UPDATE_OWN_USER),
                permissionRepository.findAll());
    }



}