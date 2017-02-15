package io.smsc.repository.customer;

import io.smsc.model.customer.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link Customer} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "customers", path = "customers")
@Transactional(readOnly = true)
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    Customer save(Customer customer);

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    void delete(Long id);

    @Override
    @EntityGraph(attributePaths = {"users", "contacts", "parent"})
    @PreAuthorize("hasAuthority('ADMIN')")
    Customer findOne(Long id);

    @Override
    @EntityGraph(attributePaths = {"users", "contacts", "parent"})
    @PreAuthorize("hasAuthority('ADMIN')")
    Page<Customer> findAll(Pageable pageable);

}
