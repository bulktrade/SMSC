package io.smsc.repository.gateway;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.gateway.settings.policy.SenderPolicy;
import io.smsc.model.gateway.settings.policy.QSenderPolicy;
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
 * CRUD methods to operate with {@link SenderPolicy} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.4-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "sender-policies", path = "sender-policies")
@Transactional(readOnly = true)
@PreAuthorize("hasRole('ADMIN_USER')")
public interface SenderPolicyRepository extends PagingAndSortingRepository<SenderPolicy, Long>,
        QueryDslPredicateExecutor<SenderPolicy>,
        QuerydslBinderCustomizer<QSenderPolicy> {

    @Override
    default void customize(QuerydslBindings bindings, QSenderPolicy root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::startsWithIgnoreCase);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or ((#senderPolicy?.id == null) and hasAuthority('SENDER_POLICY_CREATE')) or " +
            "(!(#senderPolicy?.id == null) and hasAuthority('SENDER_POLICY_WRITE'))")
    SenderPolicy save(@Param("senderPolicy") SenderPolicy senderPolicy);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_DELETE')")
    void delete(Long id);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_READ')")
    SenderPolicy findOne(Long id);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_READ')")
    Page<SenderPolicy> findAll(Pageable pageable);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_READ')")
    Page<SenderPolicy> findAll(Predicate predicate, Pageable pageable);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_READ')")
    SenderPolicy findOne(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_READ')")
    Iterable<SenderPolicy> findAll(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_READ')")
    Iterable<SenderPolicy> findAll(Predicate predicate, Sort sort);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_READ')")
    Iterable<SenderPolicy> findAll(Predicate predicate, OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_READ')")
    Iterable<SenderPolicy> findAll(OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_COUNT')")
    long count(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_EXISTS')")
    boolean exists(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_READ')")
    Iterable<SenderPolicy> findAll(Sort sort);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_EXISTS')")
    boolean exists(Long id);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_READ')")
    Iterable<SenderPolicy> findAll();

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_READ')")
    Iterable<SenderPolicy> findAll(Iterable<Long> ids);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_COUNT')")
    long count();

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_DELETE')")
    void delete(SenderPolicy senderPolicy);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_DELETE')")
    void delete(Iterable<? extends SenderPolicy> senderPolicies);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SENDER_POLICY_DELETE')")
    void deleteAll();

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or ((filterObject.id == null) and hasAuthority('SENDER_POLICY_CREATE')) or " +
            "(!(filterObject.id == null) and hasAuthority('SENDER_POLICY_WRITE'))")
    <S extends SenderPolicy> Iterable<S> save(Iterable<S> senderPolicies);
}
