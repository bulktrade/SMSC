package io.smsc.repository.dashboard;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.dashboard.Dashboard;
import io.smsc.model.dashboard.DashboardBox;
import io.smsc.model.dashboard.DashboardBoxType;
import io.smsc.model.dashboard.QDashboardBox;
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
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link DashboardBox} entities and exporting them
 * to appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "dashboard-boxes", path = "dashboard-boxes")
@Transactional(readOnly = true)
@PreAuthorize("hasRole('ADMIN_USER')")
public interface DashboardBoxRepository extends PagingAndSortingRepository<DashboardBox, Long>,
        QueryDslPredicateExecutor<DashboardBox>,
        QuerydslBinderCustomizer<QDashboardBox> {

    @Override
    default public void customize(QuerydslBindings bindings, QDashboardBox root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_DELETE')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or (#dashboardBox?.isNew() and hasAuthority('DASHBOARD_BOX_CREATE')) or " +
            "(!#dashboardBox?.isNew() and hasAuthority('DASHBOARD_BOX_WRITE'))")
    DashboardBox save(@Param("dashboardBox") DashboardBox dashboardBox);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_READ')")
    DashboardBox findOne(Long id);

    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_READ')")
    List<DashboardBox> findAllByName(@Param("name") String name);

    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_READ')")
    List<DashboardBox> findAllByDashboard(@RequestBody Dashboard dashboard);

    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_READ')")
    List<DashboardBox> findAllByDashboardBoxType(@RequestBody DashboardBoxType dashboardBoxType);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_READ')")
    Page<DashboardBox> findAll(Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_READ')")
    Page<DashboardBox> findAll(Predicate predicate, Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_READ')")
    DashboardBox findOne(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_READ')")
    Iterable<DashboardBox> findAll(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_READ')")
    Iterable<DashboardBox> findAll(Predicate predicate, Sort sort);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_READ')")
    Iterable<DashboardBox> findAll(Predicate predicate, OrderSpecifier<?>[] orders);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_READ')")
    Iterable<DashboardBox> findAll(OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_COUNT')")
    long count(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_EXISTS')")
    boolean exists(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_READ')")
    Iterable<DashboardBox> findAll(Sort sort);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or (filterObject.isNew() and hasAuthority('DASHBOARD_BOX_CREATE')) or " +
            "(!filterObject.isNew() and hasAuthority('DASHBOARD_BOX_WRITE'))")
    <S extends DashboardBox> Iterable<S> save(Iterable<S> dashboardBoxes);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_EXISTS')")
    boolean exists(Long id);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_READ')")
    Iterable<DashboardBox> findAll();

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_READ')")
    Iterable<DashboardBox> findAll(Iterable<Long> ids);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_COUNT')")
    long count();

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_DELETE')")
    void delete(DashboardBox dashboardBox);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_DELETE')")
    void delete(Iterable<? extends DashboardBox> dashboardBoxes);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('DASHBOARD_BOX_DELETE')")
    void deleteAll();
}
