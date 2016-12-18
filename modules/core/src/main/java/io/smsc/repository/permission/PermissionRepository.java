package io.smsc.repository.permission;

import io.smsc.model.Permission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "permissions", path = "permissions")
@Transactional(readOnly = true)
public interface PermissionRepository extends JpaRepository<Permission, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    void delete(Long id);

    @Override
    Permission save(Permission permission);

    @Override
    Permission findOne(Long id);

    Permission findByName(@Param("name")String name);

    // /rest/repository/permissions/search/findAll
    @RestResource(path = "findAll")
    List<Permission> findAllDistinctByOrderById();

    // Prevents GET /permissions
    @Override
    @RestResource(exported = false)
    Page<Permission> findAll(Pageable pageable);
}
