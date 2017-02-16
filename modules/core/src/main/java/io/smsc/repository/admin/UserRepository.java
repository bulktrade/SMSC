package io.smsc.repository.admin;

import io.smsc.model.admin.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link User} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "users", path = "users")
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<User, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    User save(User user);

    @Override
    @EntityGraph(attributePaths = {"aclSid", "dashboards", "groups"})
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    User findOne(Long id);

    @EntityGraph(attributePaths = {"aclSid", "dashboards", "groups"})
    User findByUsername(@Param("username") String userName);

    @EntityGraph(attributePaths = {"aclSid", "dashboards", "groups"})
    User findByEmail(@Param("email") String email);

    @Override
    @EntityGraph(attributePaths = {"aclSid", "dashboards", "groups"})
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    Page<User> findAll(Pageable pageable);
}
