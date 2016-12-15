package io.smsc.repository.dashboard.dashboardBox;

import io.smsc.model.dashboard.Dashboard;
import io.smsc.model.dashboard.DashboardBox;
import io.smsc.model.dashboard.DashboardBoxType;
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
    @RestResource(path = "delete")
    void delete(@Param("id") Long id);

    @Override
    @RestResource(path = "delete")
    DashboardBox save(@RequestBody DashboardBox dashboardBox);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType","dashboard","width","height"})
    DashboardBox findOne(@Param("id") Long id);

    @EntityGraph(attributePaths = {"dashboardBoxType","dashboard","width","height"})
    List<DashboardBox> findAllByName(@Param("name") String name);

    @EntityGraph(attributePaths = {"dashboardBoxType","dashboard","width","height"})
    List<DashboardBox> findAllByDashboard(@Param("dashboard") Dashboard dashboard);

    @EntityGraph(attributePaths = {"dashboardBoxType","dashboard","width","height"})
    List<DashboardBox> findAllByDashboardBoxType(@Param("dashboardBoxType") DashboardBoxType dashboardBoxType);

    @EntityGraph(attributePaths = {"dashboardBoxType","dashboard","width","height"})
    @RestResource(path = "findAll")
    List<DashboardBox> findAllDistinctByOrderById();
}
