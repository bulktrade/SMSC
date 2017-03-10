package io.smsc.repository.admin;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.admin.Authority;
import io.smsc.model.admin.QAuthority;
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
 * CRUD methods to operate with {@link Authority} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "authorities", path = "authorities")
@Transactional(readOnly = true)
@PreAuthorize("hasRole('ADMIN_USER')")
public interface AuthorityRepository extends PagingAndSortingRepository<Authority, Long>,
        QueryDslPredicateExecutor<Authority>,
        QuerydslBinderCustomizer<QAuthority> {

    @Override
    default public void customize(QuerydslBindings bindings, QAuthority root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_DELETE')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or ((#authority?.id == null) and hasAuthority('AUTHORITY_CREATE')) or " +
            "(!(#authority?.id == null) and hasAuthority('AUTHORITY_WRITE'))")
    Authority save(@Param("authority") Authority authority);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_READ')")
    Authority findOne(Long id);

    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_READ')")
    Authority findByName(@Param("name") String name);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_READ')")
    Page<Authority> findAll(Pageable pageable);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_READ')")
    Page<Authority> findAll(Predicate predicate, Pageable pageable);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_READ')")
    Authority findOne(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_READ')")
    Iterable<Authority> findAll(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_READ')")
    Iterable<Authority> findAll(Predicate predicate, Sort sort);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_READ')")
    Iterable<Authority> findAll(Predicate predicate, OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_READ')")
    Iterable<Authority> findAll(OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_COUNT')")
    long count(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_EXISTS')")
    boolean exists(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_READ')")
    Iterable<Authority> findAll(Sort sort);

    @Override
    @PreFilter("hasRole('POWER_ADMIN_USER') or ((filterObject.id == null) and hasAuthority('AUTHORITY_CREATE')) or " +
            "(!(filterObject.id == null) and hasAuthority('AUTHORITY_WRITE'))")
    <S extends Authority> Iterable<S> save(Iterable<S> authorities);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_EXISTS')")
    boolean exists(Long id);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_READ')")
    Iterable<Authority> findAll();

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_READ')")
    Iterable<Authority> findAll(Iterable<Long> ids);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_COUNT')")
    long count();

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_DELETE')")
    void delete(Authority authority);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_DELETE')")
    void delete(Iterable<? extends Authority> authorities);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('AUTHORITY_DELETE')")
    void deleteAll();
}
