package io.smsc.repository.customer.customer;

import io.smsc.model.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * This repository class is used only for providing {@link Customer} {@code save} method
 * in java based flyway migration without using {@link io.smsc.security.JWTAuthenticationTokenFilter}
 * filter.
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@Component
@Transactional(readOnly = true)
public interface CustomerMigrationRepository extends JpaRepository<Customer, Long> {

    @Override
    @Transactional
    @RestResource(exported = false)
    Customer save(Customer customer);
}
