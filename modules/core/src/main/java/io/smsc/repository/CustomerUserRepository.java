package io.smsc.repository;

import io.smsc.model.CustomerUser;
import io.smsc.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
@RepositoryRestResource(collectionResourceRel = "customer-users", path = "customer-users")
@Transactional(readOnly = true)
public interface CustomerUserRepository extends JpaRepository<CustomerUser, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    CustomerUser save(CustomerUser customerUser);

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    CustomerUser findOne(Long id);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    User findByUsername(@Param("username") String userName);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    User findByEmail(@Param("email") String email);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Page<CustomerUser> findAllByOrderByIdAsc(Pageable pageable);
}
