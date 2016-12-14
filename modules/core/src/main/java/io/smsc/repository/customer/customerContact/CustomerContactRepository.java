package io.smsc.repository.customer.customerContact;

import io.smsc.model.customer.CustomerContact;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "customer-contacts", path = "customer-contacts")
@Transactional(readOnly = true)
public interface CustomerContactRepository extends JpaRepository<CustomerContact, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    void delete(Long id);

    @Override
    CustomerContact save(CustomerContact customer);

    @Override
    @EntityGraph(attributePaths = {"customer","type","salutation"})
    CustomerContact findOne(@Param("id") Long id);

    @EntityGraph(attributePaths = {"customer","type","salutation"})
    CustomerContact findByEmailAddress(@Param("emailAddress") String emailAddress);

    @EntityGraph(attributePaths = {"customer","type","salutation"})
    @RestResource(path = "findAll")
    List<CustomerContact> findAllDistinctByOrderById();
}
