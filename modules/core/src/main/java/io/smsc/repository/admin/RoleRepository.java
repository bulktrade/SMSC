package io.smsc.repository.admin;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.admin.QRole;
import io.smsc.model.admin.Role;
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
 * CRUD methods to operate with {@link Role} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "roles", path = "roles")
@Transactional(readOnly = true)
@PreAuthorize("hasRole('ADMIN_USER')")
public interface RoleRepository extends PagingAndSortingRepository<Role, Long>,
        QueryDslPredicateExecutor<Role>,
        QuerydslBinderCustomizer<QRole> {

    @Override
    default public void customize(QuerydslBindings bindings, QRole root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_DELETE')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (#role?.isNew() and hasAuthority('ADMIN_USER_ROLE_CREATE')) or " +
            "(!#role?.isNew() and hasAuthority('ADMIN_USER_ROLE_WRITE'))")
    Role save(@Param("role") Role role);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_READ')")
    Role findOne(Long id);

    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_READ')")
    Role findByName(@Param("name") String name);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_READ')")
    Page<Role> findAll(Pageable pageable);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_READ')")
    Page<Role> findAll(Predicate predicate, Pageable pageable);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_READ')")
    Role findOne(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_READ')")
    Iterable<Role> findAll(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_READ')")
    Iterable<Role> findAll(Predicate predicate, Sort sort);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_READ')")
    Iterable<Role> findAll(Predicate predicate, OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_READ')")
    Iterable<Role> findAll(OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_COUNT')")
    long count(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_EXISTS')")
    boolean exists(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_READ')")
    Iterable<Role> findAll(Sort sort);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or (filterObject.isNew() and hasAuthority('ADMIN_USER_ROLE_CREATE')) or " +
            "(!filterObject.isNew() and hasAuthority('ADMIN_USER_ROLE_WRITE'))")
    <S extends Role> Iterable<S> save(Iterable<S> entities);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_EXISTS')")
    boolean exists(Long id);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_READ')")
    Iterable<Role> findAll();

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_READ')")
    Iterable<Role> findAll(Iterable<Long> ids);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_COUNT')")
    long count();

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_DELETE')")
    void delete(Role role);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_DELETE')")
    void delete(Iterable<? extends Role> roles);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('ADMIN_USER_ROLE_DELETE')")
    void deleteAll();
}
