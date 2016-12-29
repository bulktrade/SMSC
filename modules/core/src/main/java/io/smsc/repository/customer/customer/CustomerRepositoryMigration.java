package io.smsc.repository.customer.customer;

import io.smsc.model.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

@RepositoryRestResource(collectionResourceRel = "migration/customers", path = "migration/customers", exported = false)
@Transactional(readOnly = true)
public interface CustomerRepositoryMigration extends JpaRepository<Customer, Long> {

    @Override
    @Transactional
    Customer save(Customer customer);
}
