package io.smsc.repository;

import io.smsc.model.Permission;
import io.smsc.repository.permission.PermissionRepository;
import io.smsc.repository.role.RoleRepository;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static io.smsc.PermissionTestData.*;

public class PermissionRepositoryTest extends AbstractRepositoryTest {

    @Autowired
    private PermissionRepository permissionRepository;

    @Test
    public void delete() throws Exception {
        permissionRepository.deleteById(PERMISSION_READ_ONLY_ID);
        PERMISSION_MODEL_MATCHER.assertCollectionEquals(Collections.singletonList(PERMISSION_READ_WRITE),permissionRepository.findAll());
    }

    @Test
    public void save() throws Exception {
        Permission newPermission = new Permission(null,"PERMISSION_UNLIMITED");
        Permission created = permissionRepository.save(newPermission);
        newPermission.setId(created.getId());
        PERMISSION_MODEL_MATCHER.assertEquals(newPermission,permissionRepository.findOne(newPermission.getId()));
    }

    @Test
    public void get() throws Exception {
        Permission permission = permissionRepository.findOne(PERMISSION_READ_ONLY_ID);
        PERMISSION_MODEL_MATCHER.assertEquals(PERMISSION_READ_ONLY,permission);
    }

    @Test
    public void getAll() throws Exception {
        Collection<Permission> permissions = permissionRepository.findAll();
        PERMISSION_MODEL_MATCHER.assertCollectionEquals(Arrays.asList(PERMISSION_READ_ONLY, PERMISSION_READ_WRITE), permissions);
    }

    @Test
    public void update() throws Exception{
        Permission updated = new Permission(PERMISSION_READ_ONLY);
        updated.setName("PERMISSION_WITHOUT_ACCESS");
        permissionRepository.save(updated);
        PERMISSION_MODEL_MATCHER.assertEquals(updated, permissionRepository.findOne(PERMISSION_READ_ONLY_ID));
    }

}