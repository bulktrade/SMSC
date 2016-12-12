package io.smsc.repository.dashboard.dashboardBoxType;

import io.smsc.model.dashboard.DashboardBoxType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "dashboard-box-type's", path = "dashboard-box-type's")
@Transactional(readOnly = true)
public interface DashboardBoxTypeRepository extends JpaRepository<DashboardBoxType, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    void delete(Long id);

    @Override
    DashboardBoxType save(DashboardBoxType dashboardBoxType);

    @Override
    @EntityGraph(attributePaths = {"dashboardBoxes","kind","type"})
    DashboardBoxType findOne(Long id);

    @EntityGraph(attributePaths = {"dashboardBoxes","kind","type"})
    DashboardBoxType findByName(@Param("name")String name);

    @EntityGraph(attributePaths = {"dashboardBoxes","kind","type"})
    List<DashboardBoxType> findAllDistinctByOrderById();

}
