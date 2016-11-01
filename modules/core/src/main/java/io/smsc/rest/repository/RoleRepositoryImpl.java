package io.smsc.rest.repository;

import io.smsc.model.Permission;
import io.smsc.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoleRepositoryImpl {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    public boolean delete(long id) {
        return roleRepository.delete(id) != 0;
    }


    public Role save(Role role){
        return roleRepository.save(role);
    }


    public Role get(long id){
        return roleRepository.findOne(id);
    }


    public List<Role> getAll(){
        return roleRepository.findAll();
    }

    public Role addPermission(Long roleId, Long permissionId){
        Role role = roleRepository.findOne(roleId);
        Permission permission = permissionRepository.findOne(permissionId);
        role.addPermission(permission);
        return roleRepository.save(role);
    }

    public Role removePermission(Long roleId, Long permissionId){
        Role role = roleRepository.findOne(roleId);
        Permission permission = permissionRepository.findOne(permissionId);
        role.removePermission(permission);
        return roleRepository.save(role);
    }
}
