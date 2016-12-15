package io.smsc.repository.dashboard.dashboard;

import io.smsc.model.dashboard.*;
import io.smsc.repository.dashboard.dashboardBox.DashboardBoxRepository;
import io.smsc.repository.dashboard.dashboardBoxType.DashboardBoxTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DashboardRepositoryImpl implements DashboardRepositoryCustom {

    @Autowired
    private DashboardRepository dashboardRepository;

    @Autowired
    private DashboardBoxRepository dashboardBoxRepository;

    @Autowired
    private DashboardBoxTypeRepository dashboardBoxTypeRepository;

    @Override
    public Dashboard addDashboardBox(Long dashboardId, Long dashboardBoxTypeId, Width width, Height height, Integer order, String name, String description) {
        Dashboard dashboard = dashboardRepository.findOne(dashboardId);
        DashboardBoxType dashboardBoxType = dashboardBoxTypeRepository.findOne(dashboardBoxTypeId);
        DashboardBox dashboardBox = new DashboardBox(null, width, height, order, name, description, dashboard, dashboardBoxType);
        dashboardBoxRepository.save(dashboardBox);
        dashboardBoxTypeRepository.save(dashboardBoxType);
        return dashboardRepository.save(dashboard);
    }

    @Override
    public Dashboard removeDashboardBox(Long dashboardId, Long dashboardBoxId) {
        Dashboard dashboard = dashboardRepository.findOne(dashboardId);
        DashboardBox dashboardBox = dashboardBoxRepository.findOne(dashboardBoxId);
        if(dashboardBox.getDashboard().equals(dashboard)) {
            dashboardBoxRepository.delete(dashboardBoxId);
        }
        return dashboardRepository.save(dashboard);
    }
}
