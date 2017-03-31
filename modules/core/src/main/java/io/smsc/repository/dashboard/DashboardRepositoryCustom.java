package io.smsc.repository.dashboard;

import io.smsc.model.dashboard.Dashboard;

/**
 * Custom interface with save methods declaration which are be implemented
 * in {@link DashboardRepositoryImpl}
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.4-SNAPSHOT
 */
public interface DashboardRepositoryCustom {

    Dashboard save(Dashboard dashboard);

    <S extends Dashboard> Iterable<S> save(Iterable<S> dashboards);
}
