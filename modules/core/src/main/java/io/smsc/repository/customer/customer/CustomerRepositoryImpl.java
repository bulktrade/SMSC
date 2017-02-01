package io.smsc.repository.customer.customer;

import io.smsc.model.customer.Customer;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

/**
 * This class provides implementation of additional methods which are described in
 * {@link CustomerRepositoryCustom} to extend {@link CustomerRepository}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
public class CustomerRepositoryImpl implements CustomerRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void delete(Long customerId) {
        Customer customer = entityManager.find(Customer.class, customerId);
        TypedQuery query = entityManager.createQuery("select c from Customer c", Customer.class);
        List<Customer> customers = query.getResultList();
        for(Customer customer1 : customers) {
            if(customer.equals(customer1.getParentCustomer())) {
                customer1.setParentCustomer(null);
            }
        }
        entityManager.remove(customer);
    }
}
