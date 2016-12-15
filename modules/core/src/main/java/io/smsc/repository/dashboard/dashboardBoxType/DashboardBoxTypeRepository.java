package io.smsc.repository.dashboard.dashboardBoxType;

import io.smsc.model.dashboard.DashboardBoxType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "dashboard-box-types", path = "dashboard-box-types")
@Transactional(readOnly = true)
public interface DashboardBoxTypeRepository extends JpaRepository<DashboardBoxType, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @RestResource(path = "delete")
    void delete(@Param("id") Long id);

    @Override
    @RestResource(path = "save")
    DashboardBoxType save(@RequestBody DashboardBoxType dashboardBoxType);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes","kind","type"})
    DashboardBoxType findOne(@Param("id") Long id);

    @EntityGraph(attributePaths = {"dashboardBoxes","kind","type"})
    DashboardBoxType findByName(@Param("name") String name);

    @EntityGraph(attributePaths = {"dashboardBoxes","kind","type"})
    @RestResource(path = "findAll")
    List<DashboardBoxType> findAllDistinctByOrderById();

}
