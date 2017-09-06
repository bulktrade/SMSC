package io.smsc.repository.customer;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.QCustomer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreFilter;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link Customer} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "customers", path = "customers")
@Transactional(readOnly = true)
@PreAuthorize("hasRole('ADMIN_USER')")
public interface CustomerRepository extends PagingAndSortingRepository<Customer, Long>,
        QueryDslPredicateExecutor<Customer>,
        QuerydslBinderCustomizer<QCustomer> {

    @Override
    default void customize(QuerydslBindings bindings, QCustomer root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::startsWithIgnoreCase);
        bindings.bind(Long.class).first((SingleValueBinding<NumberPath<Long>, Long>) NumberExpression::in);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or ((#customer?.id == null) and hasAuthority('CUSTOMER_CREATE')) or " +
            "(!(#customer?.id == null) and hasAuthority('CUSTOMER_WRITE'))")
    Customer save(@Param("customer") Customer customer);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_DELETE')")
    void delete(Long id);

    @Override
    @EntityGraph(attributePaths = {"users", "contacts", "parent"})
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_READ')")
    Customer findOne(Long id);

    @Override
    @EntityGraph(attributePaths = {"users", "contacts", "parent"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_READ')")
    Page<Customer> findAll(Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"users", "contacts", "parent"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_READ')")
    Page<Customer> findAll(Predicate predicate, Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"users", "contacts", "parent"})
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_READ')")
    Customer findOne(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"users", "contacts", "parent"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_READ')")
    Iterable<Customer> findAll(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"users", "contacts", "parent"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_READ')")
    Iterable<Customer> findAll(Predicate predicate, Sort sort);

    @Override
    @EntityGraph(attributePaths = {"users", "contacts", "parent"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_READ')")
    Iterable<Customer> findAll(Predicate predicate, OrderSpecifier<?>[] orders);

    @Override
    @EntityGraph(attributePaths = {"users", "contacts", "parent"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_READ')")
    Iterable<Customer> findAll(OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_COUNT')")
    long count(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_EXISTS')")
    boolean exists(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"users", "contacts", "parent"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_READ')")
    Iterable<Customer> findAll(Sort sort);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_EXISTS')")
    boolean exists(Long id);

    @Override
    @EntityGraph(attributePaths = {"users", "contacts", "parent"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_READ')")
    Iterable<Customer> findAll();

    @Override
    @EntityGraph(attributePaths = {"users", "contacts", "parent"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_READ')")
    Iterable<Customer> findAll(Iterable<Long> ids);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_COUNT')")
    long count();

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_DELETE')")
    void delete(Customer customer);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_DELETE')")
    void delete(Iterable<? extends Customer> customers);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_DELETE')")
    void deleteAll();

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or ((filterObject.id == null) and hasAuthority('CUSTOMER_CREATE')) or " +
            "(!(filterObject.id == null) and hasAuthority('CUSTOMER_WRITE'))")
    <S extends Customer> Iterable<S> save(Iterable<S> customers);
}
