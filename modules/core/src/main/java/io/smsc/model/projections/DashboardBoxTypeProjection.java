package io.smsc.model.projections;

import io.smsc.model.dashboard.*;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

/**
 * This interface is describing excerpting projection for {@link DashboardBoxType}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author  Nazar Lipkovskyy
 * @see     Projection
 * @since   0.0.1-SNAPSHOT
 */
@Projection(name = "dashboardBoxType", types = { DashboardBoxType.class })
public interface DashboardBoxTypeProjection {

    Long getId();

    String getName();

    Type getType();

    Kind getKind();

    Set<DashboardBox> getDashboardBoxes();
}
