package io.smsc.repository.dashboard;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.dashboard.DashboardBox;
import io.smsc.model.dashboard.QDashboardBox;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreFilter;
import org.springframework.transaction.annotation.Transactional;

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
    @Modifying
    @Query("delete from DashboardBox d where d.id = ?1 and d.dashboard.user.id = ?#{principal.id}")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("(#dashboardBox?.id == null) or (!(#dashboardBox?.id == null) and " +
            "#dashboardBox.dashboard!=null)")
    DashboardBox save(@Param("dashboardBox") DashboardBox dashboardBox);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @Query("select d from DashboardBox d where d.id = ?1 and d.dashboard.user.id = ?#{principal.id}")
    DashboardBox findOne(Long id);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @RestResource(path = "findAllPage")
    @Query("select d from DashboardBox d where d.dashboard.user.id = ?#{principal.id}")
    Page<DashboardBox> findAll(Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @RestResource(path = "findAllPageWithPredicate")
    @Query("select d from DashboardBox d where d.dashboard.user.id = ?#{principal.id}")
    Page<DashboardBox> findAll(Predicate predicate, Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @RestResource(path = "findOneWithPredicate")
    @Query("select d from DashboardBox d where d.dashboard.user.id = ?#{principal.id}")
    DashboardBox findOne(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @RestResource(path = "findAllIterableWithPredicate")
    @Query("select d from DashboardBox d where d.dashboard.user.id = ?#{principal.id}")
    Iterable<DashboardBox> findAll(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @RestResource(path = "findAllWithPredicateAndSorting")
    @Query("select d from DashboardBox d where d.dashboard.user.id = ?#{principal.id}")
    Iterable<DashboardBox> findAll(Predicate predicate, Sort sort);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @RestResource(path = "findAllWithOrdersAndPredicate")
    @Query("select d from DashboardBox d where d.dashboard.user.id = ?#{principal.id}")
    Iterable<DashboardBox> findAll(Predicate predicate, OrderSpecifier<?>[] orders);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @RestResource(path = "findAllWithOrders")
    @Query("select d from DashboardBox d where d.dashboard.user.id = ?#{principal.id}")
    Iterable<DashboardBox> findAll(OrderSpecifier<?>[] orders);

    @Override
    @RestResource(path = "countWithPredicate")
    @Query("select count(d) from DashboardBox d where d.dashboard.user.id = ?#{principal.id}")
    long count(Predicate predicate);

    @Override
    @RestResource(path = "existsWithPredicate")
    @Query("select case when count(d) > 0 then true else false end from DashboardBox d where d.dashboard.user.id = ?#{principal.id}")
    boolean exists(Predicate predicate);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @RestResource(path = "findAllWithSorting")
    @Query("select d from DashboardBox d where d.dashboard.user.id = ?#{principal.id}")
    Iterable<DashboardBox> findAll(Sort sort);

    @Override
    @Transactional
    @PreFilter("(filterObject.id == null) or (!(filterObject.id == null) and (filterObject.dashboard != null))")
    <S extends DashboardBox> Iterable<S> save(Iterable<S> dashboardBoxes);

    @Override
    @Query("select case when count(d) > 0 then true else false end from DashboardBox d where d.id = ?1 and " +
            "d.dashboard.user.id = ?#{principal.id}")
    boolean exists(Long id);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @Query("select d from DashboardBox d where d.dashboard.user.id = ?#{principal.id}")
    Iterable<DashboardBox> findAll();

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PostFilter("filterObject.dashboard.user.username == principal.username")
    Iterable<DashboardBox> findAll(Iterable<Long> ids);

    @Override
    @Query("select count(d) from DashboardBox d where d.dashboard.user.id = ?#{principal.id}")
    long count();

    @Override
    @Transactional
    @PreAuthorize("#dashboardBox!=null?#dashboardBox.dashboard.user.username == principal.username:true")
    void delete(@Param("dashboardBox") DashboardBox dashboardBox);

    @Override
    @Transactional
    @PreFilter("filterObject.dashboard.user.username == principal.username")
    void delete(Iterable<? extends DashboardBox> dashboardBoxes);

    @Override
    @Transactional
    @Modifying
    @Query(value = "delete from DashboardBox d where d.dashboard.user.id = ?#{principal.id}")
    void deleteAll();
}
