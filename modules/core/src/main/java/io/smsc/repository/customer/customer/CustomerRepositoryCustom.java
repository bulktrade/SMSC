package io.smsc.repository.customer.customer;

import io.smsc.model.User;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.CustomerContact;

public interface CustomerRepositoryCustom {

    Customer addUser(Long customerId, Long userId);

    Customer removeUser(Long customerId, Long userId);

    Customer addContact(Long customerId, Long contactId);

    Customer removeContact(Long customerId, Long contactId);
}
