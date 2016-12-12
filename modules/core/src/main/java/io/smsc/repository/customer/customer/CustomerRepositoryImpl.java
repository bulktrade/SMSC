package io.smsc.repository.customer.customer;

import io.smsc.model.User;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.CustomerContact;
import io.smsc.repository.customer.customerContact.CustomerContactRepository;
import io.smsc.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CustomerRepositoryImpl implements CustomerRepositoryCustom {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerContactRepository customerContactRepository;

    @Override
    public Customer addUser(Long customerId, Long userId) {
        Customer customer = customerRepository.findOne(customerId);
        User user = userRepository.findOne(userId);
        customer.addUser(user);
        user.addCustomer(customer);
        userRepository.save(user);
        return customerRepository.save(customer);
    }

    @Override
    public Customer removeUser(Long customerId, Long userId) {
        Customer customer = customerRepository.findOne(customerId);
        User user = userRepository.findOne(userId);
        customer.removeUser(user);
        user.removeCustomer(customer);
        userRepository.save(user);
        return customerRepository.save(customer);
    }

    @Override
    public Customer addContact(Long customerId, Long contactId) {
        Customer customer = customerRepository.findOne(customerId);
        CustomerContact contact = customerContactRepository.findOne(contactId);
        if(contact.getCustomer() != null){
            contact.getCustomer().removeContact(contact);
        }
        customer.addContact(contact);
        contact.setCustomer(customer);
        customerContactRepository.save(contact);
        return customerRepository.save(customer);
    }

    @Override
    public Customer removeContact(Long customerId, Long contactId) {
        Customer customer = customerRepository.findOne(customerId);
        CustomerContact contact = customerContactRepository.findOne(contactId);
        if(contact.getCustomer().equals(customer)) {
            customer.removeContact(contact);
            contact.setCustomer(null);
        }
        customerContactRepository.save(contact);
        return customerRepository.save(customer);
    }
}
