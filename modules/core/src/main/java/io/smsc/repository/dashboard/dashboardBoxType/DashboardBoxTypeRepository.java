package io.smsc.repository.dashboard.dashboardBoxType;

import io.smsc.model.dashboard.DashboardBoxType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "dashboard-box-types", path = "dashboard-box-types")
@Transactional(readOnly = true)
public interface DashboardBoxTypeRepository extends JpaRepository<DashboardBoxType, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    void delete(Long id);

    @Override
    DashboardBoxType save(DashboardBoxType dashboardBoxType);

    @Override
    @EntityGraph(attributePaths = {"kind","type"})
    DashboardBoxType findOne(Long id);

    @EntityGraph(attributePaths = {"kind","type"})
    DashboardBoxType findByName(@Param("name") String name);

    // /rest/repository/dashboard-box-types/search/findAll
    @EntityGraph(attributePaths = {"kind","type"})
    @RestResource(path = "findAll")
    List<DashboardBoxType> findAllDistinctByOrderById();

    // Prevents GET /dashboard-box-types
    @Override
    @RestResource(exported = false)
    Page<DashboardBoxType> findAll(Pageable pageable);

}
