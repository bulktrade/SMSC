package io.smsc.repository.dashboard.dashboard;

import io.smsc.model.User;
import io.smsc.model.dashboard.Dashboard;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.method.P;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "dashboards", path = "dashboards")
@Transactional(readOnly = true)
public interface DashboardRepository extends JpaRepository<Dashboard,Long>, DashboardRepositoryCustom {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @RestResource(path = "delete")
    void delete(@Param("id") Long id);

    @Override
    @RestResource(path = "save")
    Dashboard save(@RequestBody  Dashboard dashboard);

    @Override
    @EntityGraph(attributePaths = {"user","dashboardBoxes"})
    Dashboard findOne(@Param("id") Long id);

    @EntityGraph(attributePaths = {"user","dashboardBoxes"})
    List<Dashboard> findAllByUser(@Param("user")User user);

    @EntityGraph(attributePaths = {"user","dashboardBoxes"})
    Dashboard findByName(@Param("name")String name);

    @EntityGraph(attributePaths = {"user","dashboardBoxes"})
    @RestResource(path = "findAll")
    List<Dashboard> findAllDistinctByOrderById();
}
