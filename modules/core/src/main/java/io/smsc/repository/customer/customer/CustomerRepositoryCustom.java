package io.smsc.repository.customer.customer;

import io.smsc.model.customer.Customer;

/**
 * This interface is describing additional methods to extend {@link CustomerRepository}.
 * Methods implementation is in {@link CustomerRepositoryImpl}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
public interface CustomerRepositoryCustom {

    Customer addUser(Long customerId, Long userId);

    Customer removeUser(Long customerId, Long userId);
}
