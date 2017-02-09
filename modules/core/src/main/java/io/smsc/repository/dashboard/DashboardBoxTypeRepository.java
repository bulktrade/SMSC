package io.smsc.repository.dashboard;

import io.smsc.model.dashboard.DashboardBoxType;
import io.smsc.model.projections.DashboardBoxTypeProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link DashboardBoxType} entities and exporting them
 * to appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "dashboard-box-types", path = "dashboard-box-types", excerptProjection = DashboardBoxTypeProjection.class)
@Transactional(readOnly = true)
public interface DashboardBoxTypeRepository extends JpaRepository<DashboardBoxType, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    void delete(Long id);

    @Override
    @Transactional
    DashboardBoxType save(DashboardBoxType dashboardBoxType);

    @Override
    @EntityGraph(attributePaths = {"kind", "type"})
    DashboardBoxType findOne(Long id);

    @EntityGraph(attributePaths = {"kind", "type"})
    DashboardBoxType findByName(@Param("name") String name);

    @Override
    @EntityGraph(attributePaths = {"kind", "type"})
    Page<DashboardBoxType> findAll(Pageable pageable);

}
