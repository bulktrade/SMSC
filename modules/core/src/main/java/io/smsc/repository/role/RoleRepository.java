package io.smsc.repository.role;

import io.smsc.model.Role;
import io.smsc.model.projections.RoleProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link Role} entities and exporting them to
 * appropriate endpoints.
 *
 * @author  Nazar Lipkovskyy
 * @see     RoleRepositoryCustom
 * @see     RoleRepositoryImpl
 * @since   0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "roles", path = "roles", excerptProjection = RoleProjection.class)
@Transactional(readOnly = true)
public interface RoleRepository extends JpaRepository<Role, Long>, RoleRepositoryCustom{

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    void delete(Long id);

    @Override
    @Transactional
    Role save(Role role);

    @Override
    @EntityGraph(attributePaths = {"permissions"})
    Role findOne(Long id);

    @EntityGraph(attributePaths = {"permissions"})
    Role findByName(@Param("name") String name);

    @Override
    @EntityGraph(attributePaths = {"permissions"})
    Page<Role> findAll(Pageable pageable);

}
