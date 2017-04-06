package io.smsc.repository.mcc;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.mcc.Mnc;
import io.smsc.model.mcc.QMnc;
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
 * CRUD methods to operate with {@link Mnc} entities and exporting them
 * to appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.4-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "mnc", path = "mnc")
@Transactional(readOnly = true)
@PreAuthorize("hasRole('ADMIN_USER')")
public interface MncRepository extends PagingAndSortingRepository<Mnc, Long>,
        QueryDslPredicateExecutor<Mnc>,
        QuerydslBinderCustomizer<QMnc> {

    @Override
    default void customize(QuerydslBindings bindings, QMnc root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);

        bindings.bind(Integer.class).first((SingleValueBinding<NumberPath<Integer>, Integer>) NumberExpression::eq);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_DELETE')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or ((#mnc?.id == null) and hasAuthority('MNC_CREATE')) or " +
            "(!(#mnc?.id == null) and hasAuthority('MNC_WRITE'))")
    Mnc save(@Param("mnc") Mnc mnc);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_READ')")
    Mnc findOne(Long id);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_READ')")
    Page<Mnc> findAll(Pageable pageable);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_READ')")
    Page<Mnc> findAll(Predicate predicate, Pageable pageable);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_READ')")
    Mnc findOne(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_READ')")
    Iterable<Mnc> findAll(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_READ')")
    Iterable<Mnc> findAll(Predicate predicate, Sort sort);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_READ')")
    Iterable<Mnc> findAll(Predicate predicate, OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_READ')")
    Iterable<Mnc> findAll(OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_COUNT')")
    long count(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_EXISTS')")
    boolean exists(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_READ')")
    Iterable<Mnc> findAll(Sort sort);

    @Override
    @PreFilter("hasRole('POWER_ADMIN_USER') or ((filterObject.id == null) and hasAuthority('MNC_CREATE')) or " +
            "(!(filterObject.id == null) and hasAuthority('MNC_WRITE'))")
    <S extends Mnc> Iterable<S> save(Iterable<S> mnc);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_EXISTS')")
    boolean exists(Long id);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_READ')")
    Iterable<Mnc> findAll();

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_READ')")
    Iterable<Mnc> findAll(Iterable<Long> mnc);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_COUNT')")
    long count();

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_DELETE')")
    void delete(Mnc mnc);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_DELETE')")
    void delete(Iterable<? extends Mnc> mnc);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('MNC_DELETE')")
    void deleteAll();
}
