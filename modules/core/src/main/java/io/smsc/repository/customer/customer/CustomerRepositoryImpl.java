package io.smsc.repository.customer.customer;

import io.smsc.model.User;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.CustomerContact;
import io.smsc.repository.customer.customerContact.CustomerContactRepository;
import io.smsc.repository.user.UserRepository;
import io.smsc.repository.user.UserRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CustomerRepositoryImpl implements CustomerRepositoryCustom {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Customer addUser(Long customerId, Long userId) {
        Customer customer = customerRepository.findOne(customerId);
        User user = userRepository.findOne(userId);
        if(user == null || customer == null) {
            return null;
        }
        customer.addUser(user);
//        user.addCustomer(customer);
        userRepository.save(user);
        return customerRepository.save(customer);
    }

    @Override
    public Customer removeUser(Long customerId, Long userId) {
        Customer customer = customerRepository.findOne(customerId);
        User user = userRepository.findOne(userId);
        if(user == null || customer == null) {
            return null;
        }
        customer.removeUser(user);
//        user.removeCustomer(customer);
        userRepository.save(user);
        return customerRepository.save(customer);
    }
}
