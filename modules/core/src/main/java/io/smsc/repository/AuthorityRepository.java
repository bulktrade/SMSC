package io.smsc.repository;

import io.smsc.model.Authority;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link Authority} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "authorities", path = "authorities")
@Transactional(readOnly = true)
public interface AuthorityRepository extends JpaRepository<Authority, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Authority save(Authority authority);

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Authority findOne(Long id);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Authority findByName(@Param("name") String name);

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Page<Authority> findAll(Pageable pageable);
}
