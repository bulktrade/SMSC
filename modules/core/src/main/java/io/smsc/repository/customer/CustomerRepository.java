package io.smsc.repository.customer;

import io.smsc.model.customer.Customer;
import io.smsc.model.projections.CustomerProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link Customer} entities and exporting them to
 * appropriate endpoints.
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "customers", path = "customers", excerptProjection = CustomerProjection.class)
@Transactional(readOnly = true)
public interface CustomerRepository extends JpaRepository<Customer, Long>{

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    Customer save(Customer customer);

    @Override
    @Transactional
    void delete(Long id);

    @Override
    Customer findOne(Long id);

    Customer findByCustomerId(@Param("customerId") Double customerID);

    @Override
    Page<Customer> findAll(Pageable pageable);

}
