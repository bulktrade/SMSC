package io.smsc.model.projections;

import io.smsc.model.crud.*;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

/**
 * This interface is describing excerpting projection for {@link MetaDataPropertyBindingParameter}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author  Nazar Lipkovskyy
 * @see     Projection
 * @since   0.0.1-SNAPSHOT
 */
@Projection(name = "metaDataPropertyBindingParameter", types = { MetaDataPropertyBindingParameter.class })
public interface MetaDataPropertyBindingParameterProjection {

    Long getId();

    String getFromProperty();

    String getToProperty();

    CombineOperator getCombineOperator();

    Operator getOperator();

    CrudMetaFormData getCrudMetaFormData();

    CrudMetaGridData getCrudMetaGridData();
}
