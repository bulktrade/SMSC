package io.smsc.repository.customer;

import io.smsc.model.Role;
import io.smsc.model.customer.Customer;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "customers", path = "customers")
@Transactional(readOnly = true)
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    void delete(Long id);

    @Override
    Customer save(Customer customer);

    @Override
    @EntityGraph(attributePaths = {"parentCustomer","contacts","users"})
    Customer findOne(Long id);

    @EntityGraph(attributePaths = {"parentCustomer","contacts","users"})
    Role findByCustomerId(@Param("customerId")Double customerID);

    @EntityGraph(attributePaths = {"parentCustomer","contacts","users"})
    List<Role> findAllDistinctByOrderById();
}
