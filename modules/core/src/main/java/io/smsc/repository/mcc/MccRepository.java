package io.smsc.repository.mcc;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.mcc.Mcc;
import io.smsc.model.mcc.QMcc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreFilter;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link Mcc} entities and exporting them
 * to appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.4-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "mcc", path = "mcc")
@Transactional(readOnly = true)
@PreAuthorize("hasRole('ADMIN_USER')")
public interface MccRepository extends PagingAndSortingRepository<Mcc, Integer>,
        QueryDslPredicateExecutor<Mcc>,
        QuerydslBinderCustomizer<QMcc> {

    @Override
    default void customize(QuerydslBindings bindings, QMcc root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_DELETE')")
    void delete(Integer mcc);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or ((#mcc?.mcc == null) and hasAuthority('MCC_CREATE')) or " +
            "(!(#mcc?.mcc == null) and hasAuthority('MCC_WRITE'))")
    Mcc save(@Param("mcc") Mcc mcc);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_READ')")
    Mcc findOne(Integer mcc);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_READ')")
    Page<Mcc> findAll(Pageable pageable);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_READ')")
    Page<Mcc> findAll(Predicate predicate, Pageable pageable);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_READ')")
    Mcc findOne(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_READ')")
    Iterable<Mcc> findAll(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_READ')")
    Iterable<Mcc> findAll(Predicate predicate, Sort sort);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_READ')")
    Iterable<Mcc> findAll(Predicate predicate, OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_READ')")
    Iterable<Mcc> findAll(OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_COUNT')")
    long count(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_EXISTS')")
    boolean exists(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_READ')")
    Iterable<Mcc> findAll(Sort sort);

    @Override
    @PreFilter("hasRole('POWER_ADMIN_USER') or ((filterObject.mcc == null) and hasAuthority('MCC_CREATE')) or " +
            "(!(filterObject.mcc == null) and hasAuthority('MCC_WRITE'))")
    <S extends Mcc> Iterable<S> save(Iterable<S> mcc);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_EXISTS')")
    boolean exists(Integer mcc);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_READ')")
    Iterable<Mcc> findAll();

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_READ')")
    Iterable<Mcc> findAll(Iterable<Integer> mcc);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_COUNT')")
    long count();

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_DELETE')")
    void delete(Mcc mcc);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_DELETE')")
    void delete(Iterable<? extends Mcc> mcc);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MCC_DELETE')")
    void deleteAll();
}
