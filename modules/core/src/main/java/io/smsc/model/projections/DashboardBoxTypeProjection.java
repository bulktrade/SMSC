package io.smsc.model.projections;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.smsc.model.dashboard.*;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;
import java.util.Set;

/**
 * This interface is describing excerpting projection for {@link DashboardBoxType}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author Nazar Lipkovskyy
 * @see Projection
 * @since 0.0.1-SNAPSHOT
 */
@Projection(name = "withDashboardBoxes", types = {DashboardBoxType.class})
public interface DashboardBoxTypeProjection {

    Long getId();

    Long getVersion();

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    Date getLastModifiedDate();

    String getName();

    Type getType();

    Kind getKind();

    Set<DashboardBox> getDashboardBoxes();
}
