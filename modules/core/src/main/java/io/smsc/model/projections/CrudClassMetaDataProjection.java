package io.smsc.model.projections;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.smsc.model.crud.CrudClassMetaData;
import io.smsc.model.crud.CrudMetaFormData;
import io.smsc.model.crud.CrudMetaGridData;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;
import java.util.Set;

/**
 * This interface is describing excerpting projection for {@link CrudClassMetaData}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author  Nazar Lipkovskyy
 * @see     Projection
 * @since   0.0.1-SNAPSHOT
 */
@Projection(name = "crud-class-meta-data", types = { CrudClassMetaData.class })
public interface CrudClassMetaDataProjection {

    Long getId();

    Long getVersion();

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="GMT")
    Date getLastModifiedDate();

    String getClassName();

    String getTitleColumns();

    Boolean getEditable();

    String getQuery();

    Set<CrudMetaFormData> getCrudMetaFormData();

    Set<CrudMetaGridData> getCrudMetaGridData();
}
