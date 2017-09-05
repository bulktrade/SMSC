package io.smsc.repository.gateway;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.gateway.Gateway;
import io.smsc.model.gateway.QGateway;
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
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreFilter;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link Gateway} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.4-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "gateways", path = "gateways")
@Transactional(readOnly = true)
@PreAuthorize("hasRole('ADMIN_USER')")
public interface GatewayRepository extends PagingAndSortingRepository<Gateway, Long>,
        QueryDslPredicateExecutor<Gateway>,
        QuerydslBinderCustomizer<QGateway> {

    @Override
    default void customize(QuerydslBindings bindings, QGateway root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::startsWithIgnoreCase);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or ((#gateway?.id == null) and hasAuthority('GATEWAY_CREATE')) or " +
            "(!(#gateway?.id == null) and hasAuthority('GATEWAY_WRITE'))")
    Gateway save(@Param("gateway") Gateway gateway);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_DELETE')")
    void delete(Long id);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_READ')")
    Gateway findOne(Long id);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_READ')")
    Page<Gateway> findAll(Pageable pageable);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_READ')")
    Page<Gateway> findAll(Predicate predicate, Pageable pageable);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_READ')")
    Gateway findOne(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_READ')")
    Iterable<Gateway> findAll(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_READ')")
    Iterable<Gateway> findAll(Predicate predicate, Sort sort);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_READ')")
    Iterable<Gateway> findAll(Predicate predicate, OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_READ')")
    Iterable<Gateway> findAll(OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_COUNT')")
    long count(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_EXISTS')")
    boolean exists(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_READ')")
    Iterable<Gateway> findAll(Sort sort);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_EXISTS')")
    boolean exists(Long id);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_READ')")
    Iterable<Gateway> findAll();

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_READ')")
    Iterable<Gateway> findAll(Iterable<Long> ids);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_COUNT')")
    long count();

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_DELETE')")
    void delete(Gateway gateway);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_DELETE')")
    void delete(Iterable<? extends Gateway> gateways);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GATEWAY_DELETE')")
    void deleteAll();

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or ((filterObject.id == null) and hasAuthority('GATEWAY_CREATE')) or " +
            "(!(filterObject.id == null) and hasAuthority('GATEWAY_WRITE'))")
    <S extends Gateway> Iterable<S> save(Iterable<S> gateways);
}
