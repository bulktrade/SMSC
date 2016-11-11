package io.smsc.repository.permission;

import io.smsc.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "permission", path = "rest/repository/permission")
@Transactional(readOnly = true)
public interface PermissionRepository extends JpaRepository<Permission, Long> {

    @Modifying
    @Transactional
    int deleteById(@Param("id") long id);

    @Override
    @Transactional
    Permission save(Permission permission);

    @Override
    Permission findOne(Long id);

    @Override
    @Query("SELECT p FROM Permission p ORDER BY p.id")
    List<Permission> findAll();
}
