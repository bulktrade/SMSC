package io.smsc.repository.dashboard;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.admin.User;
import io.smsc.model.dashboard.Dashboard;
import io.smsc.model.dashboard.QDashboard;
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
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreFilter;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link Dashboard} entities and exporting them
 * to appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "dashboards", path = "dashboards")
@Transactional(readOnly = true)
@PreAuthorize("hasRole('ADMIN_USER')")
public interface DashboardRepository extends PagingAndSortingRepository<Dashboard, Long>,
        QueryDslPredicateExecutor<Dashboard>,
        QuerydslBinderCustomizer<QDashboard> {

    @Override
    default public void customize(QuerydslBindings bindings, QDashboard root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_DELETE')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (#dashboard?.isNew() and hasAuthority('DASHBOARD_CREATE')) or " +
            "(!#dashboard?.isNew() and hasAuthority('DASHBOARD_WRITE'))")
    Dashboard save(@Param("dashboard") Dashboard dashboard);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_READ')")
    Dashboard findOne(Long id);

    // /rest/repository/dashboards/search/findByUser
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @RestResource(path = "findByUser")
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_READ')")
    List<Dashboard> findAllDistinctByUser(@RequestBody User user);

    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_READ')")
    Dashboard findByName(@Param("name") String name);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_READ')")
    Page<Dashboard> findAll(Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_READ')")
    Page<Dashboard> findAll(Predicate predicate, Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_READ')")
    Dashboard findOne(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_READ')")
    Iterable<Dashboard> findAll(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_READ')")
    Iterable<Dashboard> findAll(Predicate predicate, Sort sort);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_READ')")
    Iterable<Dashboard> findAll(Predicate predicate, OrderSpecifier<?>[] orders);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_READ')")
    Iterable<Dashboard> findAll(OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_COUNT')")
    long count(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_EXISTS')")
    boolean exists(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_READ')")
    Iterable<Dashboard> findAll(Sort sort);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or (filterObject.isNew() and hasAuthority('DASHBOARD_CREATE')) or " +
            "(!filterObject.isNew() and hasAuthority('DASHBOARD_WRITE'))")
    <S extends Dashboard> Iterable<S> save(Iterable<S> dashboards);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_EXISTS')")
    boolean exists(Long id);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_READ')")
    Iterable<Dashboard> findAll();

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_READ')")
    Iterable<Dashboard> findAll(Iterable<Long> ids);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_COUNT')")
    long count();

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_DELETE')")
    void delete(Dashboard dashboard);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_DELETE')")
    void delete(Iterable<? extends Dashboard> dashboards);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_DELETE')")
    void deleteAll();
}
