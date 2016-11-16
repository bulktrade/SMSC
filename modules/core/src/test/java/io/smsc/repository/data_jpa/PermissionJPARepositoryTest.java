package io.smsc.repository.data_jpa;

import io.smsc.model.Permission;
import io.smsc.repository.AbstractRepositoryTest;
import io.smsc.repository.permission.PermissionRepository;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.dao.DataIntegrityViolationException;

import javax.validation.ConstraintViolationException;

import java.util.Arrays;
import java.util.Collection;

import static io.smsc.PermissionTestData.*;

public class PermissionJPARepositoryTest extends AbstractRepositoryTest {

    @Autowired
    private PermissionRepository permissionRepository;

    @Test
    public void testDelete() throws Exception {
        permissionRepository.deleteById(PERMISSION_DELETE_USER_ID);
        PERMISSION_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(PERMISSION_READ_USER,PERMISSION_UPDATE_USER,
                PERMISSION_CREATE_USER,PERMISSION_READ_OWN_USER,PERMISSION_UPDATE_OWN_USER),permissionRepository.findAll());
    }

    @Test
    public void testSave() throws Exception {
        Permission newPermission = new Permission(null,"PERMISSION_UNLIMITED");
        Permission created = permissionRepository.save(newPermission);
        newPermission.setId(created.getId());
        PERMISSION_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(PERMISSION_READ_USER,PERMISSION_UPDATE_USER,
                PERMISSION_CREATE_USER,PERMISSION_DELETE_USER,PERMISSION_READ_OWN_USER,PERMISSION_UPDATE_OWN_USER,newPermission),
                permissionRepository.findAll());
    }

    @Test
    public void testGet() throws Exception {
        Permission permission = permissionRepository.findOne(PERMISSION_DELETE_USER_ID);
        PERMISSION_MODEL_MATCHER.assertEquals(PERMISSION_DELETE_USER,permission);
    }

    @Test
    public void testGetAll() throws Exception {
        Collection<Permission> permissions = permissionRepository.findAll();
        PERMISSION_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(PERMISSION_READ_USER,PERMISSION_UPDATE_USER,
                PERMISSION_CREATE_USER,PERMISSION_DELETE_USER,PERMISSION_READ_OWN_USER,PERMISSION_UPDATE_OWN_USER),permissions);
    }

    @Test
    public void testUpdate() throws Exception {
        Permission updated = new Permission(PERMISSION_DELETE_USER);
        updated.setName("WITHOUT_ACCESS");
        permissionRepository.save(updated);
        PERMISSION_MODEL_MATCHER.assertEquals(updated, permissionRepository.findOne(PERMISSION_DELETE_USER_ID));
    }

    @Test(expected = ConstraintViolationException.class)
    public void testInvalidNameSave() throws Exception {
        Permission newPermission = new Permission(null,"wrong_name_permission");
        Permission created = permissionRepository.save(newPermission);
        newPermission.setId(created.getId());
        PERMISSION_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(newPermission,PERMISSION_READ_USER,PERMISSION_UPDATE_USER,
                PERMISSION_CREATE_USER,PERMISSION_DELETE_USER,PERMISSION_READ_OWN_USER,PERMISSION_UPDATE_OWN_USER),
                permissionRepository.findAll());
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void testDuplicateNameSave() throws Exception {
        Permission newPermission = new Permission(PERMISSION_DELETE_USER);
        newPermission.setId(null);
        permissionRepository.save(newPermission);
        PERMISSION_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(PERMISSION_READ_USER,PERMISSION_UPDATE_USER,
                PERMISSION_CREATE_USER,PERMISSION_DELETE_USER,PERMISSION_READ_OWN_USER,PERMISSION_UPDATE_OWN_USER),
                permissionRepository.findAll());
    }



}