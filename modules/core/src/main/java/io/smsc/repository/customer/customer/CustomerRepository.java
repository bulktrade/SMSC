package io.smsc.repository.customer.customer;

import io.smsc.model.customer.Customer;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "customers", path = "customers")
@Transactional(readOnly = true)
public interface CustomerRepository extends JpaRepository<Customer, Long>, CustomerRepositoryCustom {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @RestResource(path = "delete")
    void delete(@Param("id") Long id);

    @Override
    @RestResource(path = "save")
    Customer save(@RequestBody Customer customer);

    @Override
    @EntityGraph(attributePaths = {"parentCustomer","contacts","users"})
    Customer findOne(@Param("id") Long id);

    @EntityGraph(attributePaths = {"parentCustomer","contacts","users"})
    Customer findByCustomerId(@Param("customerId")Double customerID);

    @EntityGraph(attributePaths = {"parentCustomer","contacts","users"})
    @RestResource(path = "findAll")
    List<Customer> findAllDistinctByOrderById();
}
