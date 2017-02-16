package io.smsc.repository.customer;

import io.smsc.model.customer.Contact;
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
 * CRUD methods to operate with {@link Contact} entities and exporting them
 * to appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "customer-contacts", path = "customer-contacts")
@Transactional(readOnly = true)
public interface CustomerContactRepository extends JpaRepository<Contact, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    Contact save(Contact customer);

    @Override
    @EntityGraph(attributePaths = {"type", "salutation"})
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    Contact findOne(Long id);

    @EntityGraph(attributePaths = {"type", "salutation"})
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    Contact findByEmailAddress(@Param("emailAddress") String emailAddress);

    @Override
    @EntityGraph(attributePaths = {"type", "salutation"})
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    Page<Contact> findAll(Pageable pageable);
}
