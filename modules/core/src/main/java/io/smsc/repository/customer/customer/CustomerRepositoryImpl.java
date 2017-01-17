package io.smsc.repository.customer.customer;

import io.smsc.model.User;
import io.smsc.model.customer.Customer;
import io.smsc.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.Serializable;

/**
 * This class provides implementation of additional methods which are described in
 * {@link CustomerRepositoryCustom} to extend {@link CustomerRepository}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
public class CustomerRepositoryImpl implements CustomerRepositoryCustom{

    @PersistenceContext
    private EntityManager entityManager;

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
        Customer customer = entityManager.find(Customer.class, customerId);
        User user = entityManager.find(User.class, userId);
        if(user == null || customer == null) {
            return null;
        }
        customer.addUser(user);
//        user.addCustomer(customer);
        entityManager.merge(user);
        return entityManager.merge(customer);
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
        Customer customer = entityManager.find(Customer.class, customerId);
        User user = entityManager.find(User.class, userId);
        if(user == null || customer == null) {
            return null;
        }
        customer.removeUser(user);
//        user.removeCustomer(customer);
        entityManager.merge(user);
        return entityManager.merge(customer);
    }
}
