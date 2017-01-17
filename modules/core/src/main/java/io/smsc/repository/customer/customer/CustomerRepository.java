package io.smsc.repository.customer.customer;

import io.smsc.model.customer.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link Customer} entities and exporting them to
 * appropriate endpoints.
 *
 * @author  Nazar Lipkovskyy
 * @see     CustomerRepositoryCustom
 * @see     CustomerRepositoryImpl
 * @since   0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "customers", path = "customers")
@Transactional(readOnly = true)
public interface CustomerRepository extends JpaRepository<Customer, Long>, CustomerRepositoryCustom {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    @RestResource(exported = false)
    void delete(Long id);

    @Override
    @Transactional
    Customer save(Customer customer);

    @Override
    @EntityGraph(attributePaths = {"parentCustomer", "contacts", "users"})
    Customer findOne(Long id);

    @EntityGraph(attributePaths = {"parentCustomer", "contacts", "users"})
    Customer findByCustomerId(@Param("customerId")Double customerID);

    @Override
    @EntityGraph(attributePaths = {"parentCustomer", "contacts", "users"})
    Page<Customer> findAll(Pageable pageable);

}
