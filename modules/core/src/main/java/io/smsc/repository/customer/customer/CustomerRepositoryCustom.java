package io.smsc.repository.customer.customer;

import io.smsc.model.customer.Customer;

public interface CustomerRepositoryCustom {

    Customer addUser(Long customerId, Long userId);

    Customer removeUser(Long customerId, Long userId);
}
