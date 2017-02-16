package io.smsc.repository.dashboard;

import io.smsc.model.admin.User;
import io.smsc.model.dashboard.Dashboard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link Dashboard} entities and exporting them
 * to appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "dashboards", path = "dashboards")
@Transactional(readOnly = true)
public interface DashboardRepository extends JpaRepository<Dashboard, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    Dashboard save(Dashboard dashboard);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    Dashboard findOne(Long id);

    // /rest/repository/dashboards/search/findByUser
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @RestResource(path = "findByUser")
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    List<Dashboard> findAllDistinctByUser(@RequestBody User user);

    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    Dashboard findByName(@Param("name") String name);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes"})
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    Page<Dashboard> findAll(Pageable pageable);
}
