package io.smsc.repository.customer.customerContact;

import io.smsc.model.customer.CustomerContact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link CustomerContact} entities and exporting them
 * to appropriate endpoints.
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "customer-contacts", path = "customer-contacts")
@Transactional(readOnly = true)
public interface CustomerContactRepository extends JpaRepository<CustomerContact, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    void delete(Long id);

    @Override
    @Transactional
    @RestResource(exported = false)
    CustomerContact save(CustomerContact customer);

    @Override
    @EntityGraph(attributePaths = {"type","salutation"})
    CustomerContact findOne(Long id);

    @EntityGraph(attributePaths = {"type","salutation"})
    CustomerContact findByEmailAddress(@Param("emailAddress") String emailAddress);

    @Override
    @EntityGraph(attributePaths = {"type","salutation"})
    Page<CustomerContact> findAll(Pageable pageable);
}
