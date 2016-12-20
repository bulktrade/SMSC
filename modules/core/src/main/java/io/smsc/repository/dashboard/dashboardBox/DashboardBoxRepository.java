package io.smsc.repository.dashboard.dashboardBox;

import io.smsc.model.dashboard.Dashboard;
import io.smsc.model.dashboard.DashboardBox;
import io.smsc.model.dashboard.DashboardBoxType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "dashboard-boxes", path = "dashboard-boxes")
@Transactional(readOnly = true)
public interface DashboardBoxRepository extends JpaRepository<DashboardBox, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    void delete(Long id);

    @Override
    @Transactional
    DashboardBox save(DashboardBox dashboardBox);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType","width","height"})
    DashboardBox findOne(Long id);

    @EntityGraph(attributePaths = {"dashboardBoxType","width","height"})
    List<DashboardBox> findAllByName(@Param("name") String name);

    @EntityGraph(attributePaths = {"dashboardBoxType","width","height"})
    List<DashboardBox> findAllByDashboard(@RequestBody Dashboard dashboard);

    @EntityGraph(attributePaths = {"dashboardBoxType","width","height"})
    List<DashboardBox> findAllByDashboardBoxType(@RequestBody DashboardBoxType dashboardBoxType);

    // /rest/repository/dashboard-boxes/search/findAll
    @EntityGraph(attributePaths = {"dashboardBoxType","width","height"})
    @RestResource(path = "findAll")
    List<DashboardBox> findAllDistinctByOrderById();

    // Prevents GET /dashboard-boxes
    @Override
    @RestResource(exported = false)
    Page<DashboardBox> findAll(Pageable pageable);
}
