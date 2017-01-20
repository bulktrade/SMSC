package io.smsc.model.projections;

import io.smsc.model.crud.CrudClassMetaData;
import io.smsc.model.crud.CrudMetaFormData;
import io.smsc.model.crud.CrudMetaGridData;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

/**
 * This interface is describing excerpting projection for {@link CrudClassMetaData}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author  Nazar Lipkovskyy
 * @see     Projection
 * @since   0.0.1-SNAPSHOT
 */
@Projection(name = "crudClassMetaData", types = { CrudClassMetaData.class })
public interface CrudClassMetaDataProjection {

    Long getId();

    String getClassName();

    String getTitleColumns();

    Boolean getEditable();

    String getQuery();

    Set<CrudMetaFormData> getCrudMetaFormData();

    Set<CrudMetaGridData> getCrudMetaGridData();
}
