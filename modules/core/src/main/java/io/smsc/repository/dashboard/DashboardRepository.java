package io.smsc.repository.dashboard;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.dashboard.Dashboard;
import io.smsc.model.dashboard.QDashboard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreFilter;
import org.springframework.transaction.annotation.Transactional;

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
    @Modifying
    @Query("delete from Dashboard d where d.id = ?1 and d.user.id = ?#{principal.id}")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or ((#dashboard?.id == null) and hasAuthority('DASHBOARD_CREATE')) or " +
            "(!(#dashboard?.id == null) and hasAuthority('DASHBOARD_WRITE'))")
    Dashboard save(Dashboard dashboard);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @Query("select d from Dashboard d where d.id = ?1 and d.user.id = ?#{principal.id}")
    Dashboard findOne(Long id);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @RestResource(path = "findAllPage")
    @Query("select d from Dashboard d where d.user.id = ?#{principal.id}")
    Page<Dashboard> findAll(Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @RestResource(path = "findAllPageWithPredicate")
    @Query("select d from Dashboard d where d.user.id = ?#{principal.id}")
    Page<Dashboard> findAll(Predicate predicate, Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @RestResource(path = "findOneWithPredicate")
    @Query("select d from Dashboard d where d.user.id = ?#{principal.id}")
    Dashboard findOne(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @RestResource(path = "findAllIterableWithPredicate")
    @Query("select d from Dashboard d where d.user.id = ?#{principal.id}")
    Iterable<Dashboard> findAll(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @RestResource(path = "findAllWithPredicateAndSorting")
    @Query("select d from Dashboard d where d.user.id = ?#{principal.id}")
    Iterable<Dashboard> findAll(Predicate predicate, Sort sort);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @RestResource(path = "findAllWithOrdersAndPredicate")
    @Query("select d from Dashboard d where d.user.id = ?#{principal.id}")
    Iterable<Dashboard> findAll(Predicate predicate, OrderSpecifier<?>[] orders);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @RestResource(path = "findAllWithOrders")
    @Query("select d from Dashboard d where d.user.id = ?#{principal.id}")
    Iterable<Dashboard> findAll(OrderSpecifier<?>[] orders);

    @Override
    @RestResource(path = "countWithPredicate")
    @Query("select count(d) from Dashboard d where d.user.id = ?#{principal.id}")
    long count(Predicate predicate);

    @Override
    @RestResource(path = "existsWithPredicate")
    @Query("select case when count(d) > 0 then true else false end from Dashboard d where d.user.id = ?#{principal.id}")
    boolean exists(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @RestResource(path = "findAllWithSorting")
    @Query("select d from Dashboard d where d.user.id = ?#{principal.id}")
    Iterable<Dashboard> findAll(Sort sort);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or ((filterObject.id == null) and hasAuthority('DASHBOARD_CREATE')) or " +
            "(!(filterObject.id == null) and hasAuthority('DASHBOARD_WRITE'))")
    <S extends Dashboard> Iterable<S> save(Iterable<S> dashboards);

    @Override
    @Query("select case when count(d) > 0 then true else false end from Dashboard d where d.id = ?1 and " +
            "d.user.id = ?#{principal.id}")
    boolean exists(Long id);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @Query("select d from Dashboard d where d.user.id = ?#{principal.id}")
    Iterable<Dashboard> findAll();

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @RestResource(path = "findAllWithIterating")
    @Query("select d from Dashboard d where d.user.id = ?#{principal.id}")
    Iterable<Dashboard> findAll(Iterable<Long> ids);

    @Override
    @Query("select count(d) from Dashboard d where d.user.id = ?#{principal.id}")
    long count();

    @Override
    @Transactional
    @Modifying
    @RestResource(path = "deleteDashboard")
    @Query("delete from Dashboard d where d.id = :#{#dashboard.id} and d.user.id = ?#{principal.id}")
    void delete(@Param("dashboard") Dashboard dashboard);

    @Override
    @Transactional
    @PreFilter("filterObject.user.username == principal.username")
    void delete(Iterable<? extends Dashboard> dashboards);

    @Override
    @Transactional
    @Modifying
    @Query(value = "delete from Dashboard d where d.user.id = ?#{principal.id}")
    void deleteAll();
}
