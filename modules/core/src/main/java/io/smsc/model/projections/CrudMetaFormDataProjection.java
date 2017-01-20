package io.smsc.model.projections;

import io.smsc.model.crud.CrudClassMetaData;
import io.smsc.model.crud.CrudMetaFormData;
import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

/**
 * This interface is describing excerpting projection for {@link CrudMetaFormData}
 * entity and is used for fetching relation properties in JSON response.
 *
 * @author  Nazar Lipkovskyy
 * @see     Projection
 * @since   0.0.1-SNAPSHOT
 */
@Projection(name = "crudMetaFormData", types = { CrudMetaFormData.class })
public interface CrudMetaFormDataProjection {

    Long getId();

    String getProperty();

    Boolean getEditable();

    Boolean getVisible();

    String getDecorator();

    Double getOrder();

    String getType();

    String getLinkedClass();

    String getLinkedRepository();

    String getFieldLayoutGridPosition();

    Set<MetaDataPropertyBindingParameter> getBindingParameters();

    CrudClassMetaData getCrudClassMetaData();
}
