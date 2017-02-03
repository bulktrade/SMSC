package io.smsc.repository;

import io.smsc.model.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
 * @since   0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "roles", path = "roles")
@Transactional(readOnly = true)
public interface RoleRepository extends JpaRepository<Role, Long>{

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    void delete(Long id);

    @Override
    @Transactional
    Role save(Role role);

    @Override
    Role findOne(Long id);

    Role findByName(@Param("name") String name);

    @Override
    Page<Role> findAll(Pageable pageable);

}
