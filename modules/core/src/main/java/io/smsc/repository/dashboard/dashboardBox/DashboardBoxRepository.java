package io.smsc.repository.dashboard.dashboardBox;

import io.smsc.model.dashboard.Dashboard;
import io.smsc.model.dashboard.DashboardBox;
import io.smsc.model.dashboard.DashboardBoxType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "dashboard-boxes", path = "dashboard-boxes")
@Transactional(readOnly = true)
public interface DashboardBoxRepository extends JpaRepository<DashboardBox, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    void delete(Long id);

    @Override
    DashboardBox save(DashboardBox dashboardBox);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType","dashboard","width","height"})
    DashboardBox findOne(Long id);

    @EntityGraph(attributePaths = {"dashboardBoxType","dashboard","width","height"})
    DashboardBox findByDashboard(@Param("dashboard")Dashboard dashboard);

    @EntityGraph(attributePaths = {"dashboardBoxType","dashboard","width","height"})
    DashboardBox findByDashboardBoxType(@Param("dashboardBoxType")DashboardBoxType dashboardBoxType);

    @EntityGraph(attributePaths = {"dashboardBoxType","dashboard","width","height"})
    List<DashboardBox> findAllDistinctByOrderById();
}
