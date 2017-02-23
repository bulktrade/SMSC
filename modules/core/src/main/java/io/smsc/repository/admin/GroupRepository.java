package io.smsc.repository.admin;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.admin.Group;
import io.smsc.model.admin.QGroup;
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
 * CRUD methods to operate with {@link Group} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "groups", path = "groups")
@Transactional(readOnly = true)
// until role hierarchy is implemented
@PreAuthorize("hasRole('ADMIN_USER') or hasRole('POWER_ADMIN_USER')")
public interface GroupRepository extends PagingAndSortingRepository<Group, Long>,
        QueryDslPredicateExecutor<Group>,
        QuerydslBinderCustomizer<QGroup> {

    @Override
    default public void customize(QuerydslBindings bindings, QGroup root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_DELETE')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (#group?.isNew() and hasAuthority('GROUP_CREATE')) or " +
            "(!#group?.isNew() and hasAuthority('GROUP_WRITE'))")
    Group save(Group group);

    @Override
    @EntityGraph(attributePaths = {"authorities"})
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_READ')")
    Group findOne(Long id);

    @EntityGraph(attributePaths = {"authorities"})
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_READ')")
    Group findByName(@Param("name") String name);

    @Override
    @EntityGraph(attributePaths = {"authorities"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_READ')")
    Page<Group> findAll(Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"authorities"})
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_READ')")
    Group findOne(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"authorities"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_READ')")
    Iterable<Group> findAll(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"authorities"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_READ')")
    Iterable<Group> findAll(Predicate predicate, Sort sort);

    @Override
    @EntityGraph(attributePaths = {"authorities"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_READ')")
    Iterable<Group> findAll(Predicate predicate, OrderSpecifier<?>[] orders);

    @Override
    @EntityGraph(attributePaths = {"authorities"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_READ')")
    Iterable<Group> findAll(OrderSpecifier<?>[] orders);

    @Override
    @EntityGraph(attributePaths = {"authorities"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_READ')")
    Page<Group> findAll(Predicate predicate, Pageable pageable);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_COUNT')")
    long count(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_EXISTS')")
    boolean exists(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"authorities"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_READ')")
    Iterable<Group> findAll(Sort sort);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or (filterObject.isNew() and hasAuthority('GROUP_CREATE')) or " +
            "(!filterObject.isNew() and hasAuthority('GROUP_WRITE'))")
    <S extends Group> Iterable<S> save(Iterable<S> groups);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_EXISTS')")
    boolean exists(Long id);

    @Override
    @EntityGraph(attributePaths = {"authorities"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_READ')")
    Iterable<Group> findAll();

    @Override
    @EntityGraph(attributePaths = {"authorities"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_READ')")
    Iterable<Group> findAll(Iterable<Long> ids);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_COUNT')")
    long count();

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_DELETE')")
    void delete(Group group);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_DELETE')")
    void delete(Iterable<? extends Group> groups);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('GROUP_DELETE')")
    void deleteAll();
}
