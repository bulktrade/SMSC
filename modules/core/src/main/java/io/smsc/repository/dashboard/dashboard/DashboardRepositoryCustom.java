package io.smsc.repository.dashboard.dashboard;

import io.smsc.model.dashboard.Dashboard;
import io.smsc.model.dashboard.DashboardBoxType;
import io.smsc.model.dashboard.Height;
import io.smsc.model.dashboard.Width;

public interface DashboardRepositoryCustom {

    Dashboard addDashboardBox(Long dashboardId, Long dashboardBoxTypeId, Width width, Height height, Integer order, String name, String description);
    Dashboard removeDashboardBox(Long dashboardId, Long dashboardBoxId);
}
