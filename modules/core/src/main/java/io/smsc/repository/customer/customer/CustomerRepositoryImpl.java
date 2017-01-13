package io.smsc.repository.customer.customer;

import io.smsc.model.User;
import io.smsc.model.customer.Customer;
import io.smsc.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * This class provides implementation of additional methods which are described in
 * {@link CustomerRepositoryCustom} to extend {@link CustomerRepository}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@Component
public class CustomerRepositoryImpl implements CustomerRepositoryCustom {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Method to add specific {@link User} to specific {@link Customer}
     *
     * @param  customerId  long value which identifies {@link Customer} in database
     * @param  userId      long value which identifies {@link User} in database
     *
     * @return             updated {@link Customer} entity
     */
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

    /**
     * Method to remove specific {@link User} from specific {@link Customer}
     *
     * @param  customerId  long value which identifies {@link Customer} in database
     * @param  userId      long value which identifies {@link User} in database
     *
     * @return             updated {@link Customer} entity
     */
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
