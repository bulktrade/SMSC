package io.smsc.repository.customer;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.customer.QUser;
import io.smsc.model.customer.User;
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
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link io.smsc.model.admin.User} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "customer-users", path = "customer-users")
@Transactional(readOnly = true)
@Repository("CustomerUserRepository")
@PreAuthorize("hasRole('ADMIN_USER')")
public interface UserRepository extends PagingAndSortingRepository<User, Long>,
        QueryDslPredicateExecutor<User>,
        QuerydslBinderCustomizer<QUser> {

    @Override
    default public void customize(QuerydslBindings bindings, QUser root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
        bindings.excluding(root.password);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_DELETE')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (#user?.isNew() and hasAuthority('CUSTOMER_USER_CREATE')) or " +
            "(!#user?.isNew() and hasAuthority('CUSTOMER_USER_WRITE'))")
    User save(@Param("user") User user);

    @Override
    @EntityGraph(attributePaths = {"customer"})
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_READ')")
    User findOne(Long id);

    @EntityGraph(attributePaths = {"customer"})
    User findByUsername(@Param("username") String userName);

    @EntityGraph(attributePaths = {"customer"})
    User findByEmail(@Param("email") String email);

    @Override
    @EntityGraph(attributePaths = {"customer"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_READ')")
    Page<User> findAll(Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"customer"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_READ')")
    Page<User> findAll(Predicate predicate, Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"customer"})
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_READ')")
    User findOne(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"customer"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_READ')")
    Iterable<User> findAll(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"customer"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_READ')")
    Iterable<User> findAll(Predicate predicate, Sort sort);

    @Override
    @EntityGraph(attributePaths = {"customer"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_READ')")
    Iterable<User> findAll(Predicate predicate, OrderSpecifier<?>[] orders);

    @Override
    @EntityGraph(attributePaths = {"customer"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_READ')")
    Iterable<User> findAll(OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_COUNT')")
    long count(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_EXISTS')")
    boolean exists(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"customer"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_READ')")
    Iterable<User> findAll(Sort sort);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or (filterObject.isNew() and hasAuthority('CUSTOMER_USER_CREATE')) or " +
            "(!filterObject.isNew() and hasAuthority('CUSTOMER_USER_WRITE'))")
    <S extends User> Iterable<S> save(Iterable<S> entities);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_EXISTS')")
    boolean exists(Long id);

    @Override
    @EntityGraph(attributePaths = {"customer"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_READ')")
    Iterable<User> findAll();

    @Override
    @EntityGraph(attributePaths = {"customer"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_READ')")
    Iterable<User> findAll(Iterable<Long> ids);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_COUNT')")
    long count();

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_DELETE')")
    void delete(User user);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_DELETE')")
    void delete(Iterable<? extends User> users);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CUSTOMER_USER_DELETE')")
    void deleteAll();


}
