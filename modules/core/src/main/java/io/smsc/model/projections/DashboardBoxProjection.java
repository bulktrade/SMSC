package io.smsc.model.projections;

import io.smsc.model.dashboard.*;
import org.springframework.data.rest.core.config.Projection;

/**
 * This interface is describing excerpting projection for {@link DashboardBox}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author  Nazar Lipkovskyy
 * @see     Projection
 * @since   0.0.1-SNAPSHOT
 */
@Projection(name = "dashboardBox", types = { DashboardBox.class })
public interface DashboardBoxProjection {

    Long getId();

    Width getWidth();

    Height getHeight();

    Integer getOrder();

    String getName();

    String getDescription();

    Dashboard getDashboard();

    DashboardBoxType getDashboardBoxType();
}
