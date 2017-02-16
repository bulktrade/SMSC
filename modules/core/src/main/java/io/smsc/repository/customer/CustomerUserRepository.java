package io.smsc.repository.customer;

import io.smsc.model.customer.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link io.smsc.model.admin.User} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "customer-users", path = "customer-users")
@Transactional(readOnly = true)
public interface CustomerUserRepository extends JpaRepository<User, Long> {

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
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    User findOne(Long id);

    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    User findByUsername(@Param("username") String userName);

    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    User findByEmail(@Param("email") String email);

    @Override
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    Page<User> findAll(Pageable pageable);
}
