package io.smsc.repository.customer;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.customer.QSmppUser;
import io.smsc.model.customer.SmppUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreFilter;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link SmppUser} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.4-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "smpp-customer-users", path = "smpp-customer-users")
@Transactional(readOnly = true)
public interface SmppUserRepository extends PagingAndSortingRepository<SmppUser, Long>,
        QueryDslPredicateExecutor<SmppUser>,
        QuerydslBinderCustomizer<QSmppUser> {

    @Override
    default void customize(QuerydslBindings bindings, QSmppUser root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::startsWithIgnoreCase);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_DELETE'))")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or ((#user?.id == null) and hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_CREATE')) or " +
            "(!(#user?.id == null) and hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_WRITE'))")
    SmppUser save(@Param("user") SmppUser user);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_READ'))")
    SmppUser findOne(Long id);

    @RestResource(exported = false)
    SmppUser findByUsername(@Param("username") String userName);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_READ'))")
    Page<SmppUser> findAll(Pageable pageable);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_READ'))")
    Page<SmppUser> findAll(Predicate predicate, Pageable pageable);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_READ'))")
    SmppUser findOne(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_READ'))")
    Iterable<SmppUser> findAll(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_READ'))")
    Iterable<SmppUser> findAll(Predicate predicate, Sort sort);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_READ'))")
    Iterable<SmppUser> findAll(Predicate predicate, OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_READ'))")
    Iterable<SmppUser> findAll(OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_COUNT'))")
    long count(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_EXISTS'))")
    boolean exists(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_READ'))")
    Iterable<SmppUser> findAll(Sort sort);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or ((filterObject.id == null) and hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_CREATE')) or " +
            "(!(filterObject.id == null) and hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_WRITE'))")
    <S extends SmppUser> Iterable<S> save(Iterable<S> entities);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_EXISTS'))")
    boolean exists(Long id);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_READ'))")
    Iterable<SmppUser> findAll();

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_READ'))")
    Iterable<SmppUser> findAll(Iterable<Long> ids);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_COUNT'))")
    long count();

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_DELETE'))")
    void delete(SmppUser user);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_DELETE'))")
    void delete(Iterable<? extends SmppUser> users);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (hasRole('ADMIN_USER') and hasAuthority('SMPP_CUSTOMER_USER_DELETE'))")
    void deleteAll();
}
