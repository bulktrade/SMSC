package io.smsc.rest.repository;

import io.smsc.model.Permission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public class PermissionRepositoryImpl {

    @Autowired
    private PermissionRepository permissionRepository;

    public boolean delete(long id) {
        return permissionRepository.deleteById(id) != 0;
    }

    public Permission save(Permission permission) {
        return permissionRepository.save(permission);
    }

    public Permission get(long id){
        return permissionRepository.findOne(id);
    }

    public Collection<Permission> getAll(){
        return permissionRepository.findAll();
    }
}
