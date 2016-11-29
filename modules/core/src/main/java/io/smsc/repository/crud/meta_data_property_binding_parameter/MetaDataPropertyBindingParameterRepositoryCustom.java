package io.smsc.repository.crud.meta_data_property_binding_parameter;

import io.smsc.model.crud.CombineOperator;
import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import io.smsc.model.crud.Operator;

public interface MetaDataPropertyBindingParameterRepositoryCustom {

    MetaDataPropertyBindingParameter addOperator(Long metaDataPropertyBindingParameter, Operator operator);
    MetaDataPropertyBindingParameter removeOperator(Long metaDataPropertyBindingParameter, Operator operator);

    MetaDataPropertyBindingParameter addCombineOperator(Long metaDataPropertyBindingParameter, CombineOperator combineOperator);
    MetaDataPropertyBindingParameter removeCombineOperator(Long metaDataPropertyBindingParameter, CombineOperator combineOperator);
}
