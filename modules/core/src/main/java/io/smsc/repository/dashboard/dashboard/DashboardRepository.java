package io.smsc.repository.dashboard.dashboard;

import io.smsc.model.User;
import io.smsc.model.dashboard.Dashboard;
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

@RepositoryRestResource(collectionResourceRel = "dashboards", path = "dashboards")
@Transactional(readOnly = true)
public interface DashboardRepository extends JpaRepository<Dashboard,Long>{

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    void delete(Long id);

    @Override
    @Transactional
    Dashboard save(Dashboard dashboard);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    Dashboard findOne(Long id);

    // /rest/repository/dashboards/search/findByUser
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @RestResource(path = "findByUser")
    List<Dashboard> findAllDistinctByUser(@RequestBody User user);

    @EntityGraph(attributePaths = {"dashboardBoxes"})
    Dashboard findByName(@Param("name") String name);

    // /rest/repository/dashboards/search/findAll
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @RestResource(path = "findAll")
    List<Dashboard> findAllDistinctByOrderById();

    // Prevents GET /dashboards
    @Override
    @RestResource(exported = false)
    Page<Dashboard> findAll(Pageable pageable);
}
