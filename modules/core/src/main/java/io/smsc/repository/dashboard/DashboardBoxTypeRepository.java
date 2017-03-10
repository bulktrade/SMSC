package io.smsc.repository.dashboard;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.dashboard.DashboardBoxType;
import io.smsc.model.dashboard.QDashboardBoxType;
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
 * CRUD methods to operate with {@link DashboardBoxType} entities and exporting them
 * to appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "dashboard-box-types", path = "dashboard-box-types")
@Transactional(readOnly = true)
@PreAuthorize("hasRole('ADMIN_USER')")
public interface DashboardBoxTypeRepository extends PagingAndSortingRepository<DashboardBoxType, Long>,
        QueryDslPredicateExecutor<DashboardBoxType>,
        QuerydslBinderCustomizer<QDashboardBoxType> {

    @Override
    default public void customize(QuerydslBindings bindings, QDashboardBoxType root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_DELETE')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or ((#dashboardBoxType?.id == null) and hasAuthority('DASHBOARD_BOX_TYPE_CREATE')) or " +
            "(!(#dashboardBoxType?.id == null) and hasAuthority('DASHBOARD_BOX_TYPE_WRITE'))")
    DashboardBoxType save(@Param("dashboardBoxType") DashboardBoxType dashboardBoxType);

    @Override
    @EntityGraph(attributePaths = {"kind", "type"})
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_READ')")
    DashboardBoxType findOne(Long id);

    @EntityGraph(attributePaths = {"kind", "type"})
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_READ')")
    DashboardBoxType findByName(@Param("name") String name);

    @Override
    @EntityGraph(attributePaths = {"kind", "type"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_READ')")
    Page<DashboardBoxType> findAll(Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"kind", "type"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_READ')")
    Page<DashboardBoxType> findAll(Predicate predicate, Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"kind", "type"})
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_READ')")
    DashboardBoxType findOne(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"kind", "type"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_READ')")
    Iterable<DashboardBoxType> findAll(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"kind", "type"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_READ')")
    Iterable<DashboardBoxType> findAll(Predicate predicate, Sort sort);

    @Override
    @EntityGraph(attributePaths = {"kind", "type"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_READ')")
    Iterable<DashboardBoxType> findAll(Predicate predicate, OrderSpecifier<?>[] orders);

    @Override
    @EntityGraph(attributePaths = {"kind", "type"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_READ')")
    Iterable<DashboardBoxType> findAll(OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_COUNT')")
    long count(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_EXISTS')")
    boolean exists(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"kind", "type"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_READ')")
    Iterable<DashboardBoxType> findAll(Sort sort);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or ((filterObject.id == null) and hasAuthority('DASHBOARD_BOX_TYPE_CREATE')) or " +
            "(!(filterObject.id == null) and hasAuthority('DASHBOARD_BOX_TYPE_WRITE'))")
    <S extends DashboardBoxType> Iterable<S> save(Iterable<S> dashboardBoxTypes);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_EXISTS')")
    boolean exists(Long id);

    @Override
    @EntityGraph(attributePaths = {"kind", "type"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_READ')")
    Iterable<DashboardBoxType> findAll();

    @Override
    @EntityGraph(attributePaths = {"kind", "type"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_READ')")
    Iterable<DashboardBoxType> findAll(Iterable<Long> ids);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_COUNT')")
    long count();

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_DELETE')")
    void delete(DashboardBoxType dashboardBoxType);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_DELETE')")
    void delete(Iterable<? extends DashboardBoxType> dashboardBoxTypes);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_TYPE_DELETE')")
    void deleteAll();
}
