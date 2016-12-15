package io.smsc.repository.permission;

import io.smsc.model.Permission;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "permissions", path = "permissions")
@Transactional(readOnly = true)
public interface PermissionRepository extends JpaRepository<Permission, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @RestResource(path = "delete")
    void delete(@Param("id") Long id);

    @Override
    @RestResource(path = "save")
    Permission save(@RequestBody Permission permission);

    @Override
    Permission findOne(@Param("id") Long id);

    @RestResource(path = "findAll")
    List<Permission> findAllDistinctByOrderById();
}
