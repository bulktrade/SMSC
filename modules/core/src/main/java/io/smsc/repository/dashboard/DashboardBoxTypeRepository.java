package io.smsc.repository.dashboard;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.dashboard.DashboardBoxType;
import io.smsc.model.dashboard.QDashboardBoxType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
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
public interface DashboardBoxTypeRepository extends JpaRepository<DashboardBoxType, Long>,
        QueryDslPredicateExecutor<DashboardBoxType>,
        QuerydslBinderCustomizer<QDashboardBoxType> {

    @Override
    default public void customize(QuerydslBindings bindings, QDashboardBoxType root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    DashboardBoxType save(DashboardBoxType dashboardBoxType);

    @Override
    @EntityGraph(attributePaths = {"kind", "type"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    DashboardBoxType findOne(Long id);

    @EntityGraph(attributePaths = {"kind", "type"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    DashboardBoxType findByName(@Param("name") String name);

    @Override
    @EntityGraph(attributePaths = {"kind", "type"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Page<DashboardBoxType> findAll(Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"kind", "type"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Page<DashboardBoxType> findAll(Predicate predicate, Pageable pageable);

}
