package io.smsc.repository.permission;

import io.smsc.model.Permission;
import io.smsc.model.projections.PermissionProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link Permission} entities and exporting them
 * to appropriate endpoints.
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "permissions", path = "permissions", excerptProjection = PermissionProjection.class)
@Transactional(readOnly = true)
public interface PermissionRepository extends JpaRepository<Permission, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    void delete(Long id);

    @Override
    @Transactional
    Permission save(Permission permission);

    @Override
    Permission findOne(Long id);

    Permission findByName(@Param("name") String name);

    @Override
    Page<Permission> findAll(Pageable pageable);
}
