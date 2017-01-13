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

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link Permission} entities and exporting them
 * to appropriate endpoints.
 *
 * @author  Nazar Lipkovskyy
// * @see     PermissionMigrationRepository
 * @since   0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "permissions", path = "permissions")
@Transactional(readOnly = true)
public interface PermissionRepository extends JpaRepository<Permission, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    void delete(Long id);

    @Override
    @Transactional
    @RestResource(exported = false)
    Permission save(Permission permission);

    @Override
    Permission findOne(Long id);

    Permission findByName(@Param("name")String name);

    @Override
    Page<Permission> findAll(Pageable pageable);
}
