package io.smsc.repository.admin;

import io.smsc.model.admin.Group;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link io.smsc.model.admin.Group} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "groups", path = "groups")
@Transactional(readOnly = true)
public interface GroupRepository extends JpaRepository<Group, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    Group save(Group group);

    @Override
    @EntityGraph(attributePaths = {"aclSid", "users"})
    @PreAuthorize("hasAuthority('ADMIN')")
    Group findOne(Long id);

    @Override
    @EntityGraph(attributePaths = {"aclSid", "users"})
    @PreAuthorize("hasAuthority('ADMIN')")
    Page<Group> findAll(Pageable pageable);
}
