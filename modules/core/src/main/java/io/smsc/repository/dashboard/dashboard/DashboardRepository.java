package io.smsc.repository.dashboard.dashboard;

import io.smsc.model.User;
import io.smsc.model.dashboard.Dashboard;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "dashboards", path = "dashboards")
@Transactional(readOnly = true)
public interface DashboardRepository extends JpaRepository<Dashboard,Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    void delete(Long id);

    @Override
    Dashboard save(Dashboard dashboard);

    @Override
    @EntityGraph(attributePaths = {"user","dashboardBoxes"})
    Dashboard findOne(Long id);

    @EntityGraph(attributePaths = {"user","dashboardBoxes"})
    Dashboard findByUser(@Param("user")User user);

    @EntityGraph(attributePaths = {"user","dashboardBoxes"})
    Dashboard findByName(@Param("name")String name);

    @EntityGraph(attributePaths = {"user","dashboardBoxes"})
    List<Dashboard> findAllDistinctByOrderById();
}
