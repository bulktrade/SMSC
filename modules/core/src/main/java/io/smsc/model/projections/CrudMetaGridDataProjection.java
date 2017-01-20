package io.smsc.model.projections;

import io.smsc.model.crud.CrudClassMetaData;
import io.smsc.model.crud.CrudMetaGridData;
import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

/**
 * This interface is describing excerpting projection for {@link CrudMetaGridData}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author  Nazar Lipkovskyy
 * @see     Projection
 * @since   0.0.1-SNAPSHOT
 */
@Projection(name = "crudMetaGridData", types = { CrudMetaGridData.class })
public interface CrudMetaGridDataProjection {

    Long getId();

    String getProperty();

    Boolean getEditable();

    Boolean getVisible();

    String getDecorator();

    Double getOrder();

    String getType();

    String getLinkedClass();

    String getLinkedRepository();

    Double getColumnWidth();

    Set<MetaDataPropertyBindingParameter> getBindingParameters();

    CrudClassMetaData getCrudClassMetaData();
}
