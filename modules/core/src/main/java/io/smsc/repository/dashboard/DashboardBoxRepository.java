package io.smsc.repository.dashboard;

import io.smsc.model.dashboard.Dashboard;
import io.smsc.model.dashboard.DashboardBox;
import io.smsc.model.dashboard.DashboardBoxType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link DashboardBox} entities and exporting them
 * to appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "dashboard-boxes", path = "dashboard-boxes")
@Transactional(readOnly = true)
public interface DashboardBoxRepository extends JpaRepository<DashboardBox, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    DashboardBox save(DashboardBox dashboardBox);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    DashboardBox findOne(Long id);

    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    List<DashboardBox> findAllByName(@Param("name") String name);

    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    List<DashboardBox> findAllByDashboard(@RequestBody Dashboard dashboard);

    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    List<DashboardBox> findAllByDashboardBoxType(@RequestBody DashboardBoxType dashboardBoxType);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxType", "width", "height"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Page<DashboardBox> findAll(Pageable pageable);
}
